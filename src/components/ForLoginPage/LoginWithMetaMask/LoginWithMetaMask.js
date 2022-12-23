import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ethers} from 'ethers'

import {MetamaskService} from "../../../services/metamask.service";
import {userServices} from "../../../services";
import {login, registration} from "../../../store";
import rootCSS from "../../../styles/root.module.css";
import css_helper from "../../../pages/RegisterPage/RegisterPage.module.css";
import css from './LoginWithMetaMask.module.css'
import metamask from '../../../images/metamask.svg'

const LoginWithMetaMask = () => {
    const {user} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);

    const dispatch = useDispatch();
    const {reset, register, handleSubmit} = useForm();


    const [loading, setLoading] = useState();
    const [err, setErr] = useState(null);
    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState(null);
    const [inputMailError, setInputMailError] = useState(null);

    const loginWithMetaMask = async () => {
        try {
            setLoading("Connecting to your wallet ...")

            if (!window.ethereum) return setLoading("Please install a MetaMask !")

            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const walletAddress = await signer.getAddress()
            setAddress(walletAddress);

            const {data} = await MetamaskService.nonce(walletAddress);
            setLoading("Please, signe a message...")

            const signature = await signer.signMessage(data?.nonce);
            if (!signature) {
                return setLoading('')
            }

            setLoading("Verifying...")
            const response = await MetamaskService.verify(walletAddress, signature, data?.nonce);
            const email = response?.data?.data[0]?.attributes?.email;

            if (!response.data.data.length && !email) {
                throw new Error('Email or verify error....')
            }

            if (response.data.data.length && email) {
                setLoading("Please wait...")
                const user = await userServices.getUserByEmail(email);
                if (user.length > 0) {
                    return makeLogin({
                        identifier: email,
                        password: walletAddress,
                    })
                }
                const index = email.indexOf('@');
                const nickName = email.slice(0, index);

                await dispatch(registration({
                    username: nickName,
                    email: email,
                    password: address,
                }))

                return makeLogin({
                    identifier: email,
                    password: walletAddress,
                })
            }

            if (response.data.data.length && !email) {
                setLoading("Waiting for form data...")
                return setModal(!modal)
            }

        } catch (e) {
            setLoading('')
            setErr(e.message)
        }
    }

    const makeLogin = async (obj) => {
        await dispatch(login(obj));
    };
    const formHandler = async ({email}) => {
        if (!email) {
            setInputMailError(`${EN ? 'Email is a required field....' : 'Пошта обов\'язкове поле'}`);
            reset()
            return setTimeout(() => {
                setInputMailError('')
            }, 4000)
        }
        const userWithEmailExist = await userServices.getUserByEmail(email);
        if (userWithEmailExist.length > 0) {
            setInputMailError(`${EN ? 'This email already exist....' : "Така електронна адреса уже існує..."}`);
            reset()
            return setTimeout(() => {
                setInputMailError('')
            }, 4000)
        }
        const response = await MetamaskService.saveEmail(email, address);

        const index = email.indexOf('@');
        const nickName = email.slice(0, index);

        await dispatch(registration({
            username: nickName,
            email: response?.data?.email,
            password: address,
        }))
        await makeLogin({
            identifier: response?.data?.email,
            password: address,
        })
        setModal(!modal);
    }
    if (user) {
        return <Navigate to="/user" replace/>;
    }

    return (
        <>
            <div className={css_helper.google__login__btn} onClick={loginWithMetaMask}>
                <div className={css.login__button}>
                    <img src={metamask} alt="metamask" className={css.metamask__icon}/>
                    {EN ? "MetaMask login" : "Увійдіть з MetaMask"}
                </div>
            </div>

            {loading && <h3 className={css.loading}>{loading}</h3>}
            {/*{err && <h3 className={css.mail__error}>{err}</h3>}*/}

            {modal &&
                <div className={css.modal__container}>
                    <div className={css.modal__block}>
                        <div className={css.register__header}>
                            {EN ? "Please enter your email address, it will only be used once " :
                                "Будь ласка, введіть свою електронну адресу, вона буде використана лише один раз"}
                        </div>
                        <form onSubmit={handleSubmit(formHandler)} className={css.form__block}>
                            <input
                                type="text"
                                placeholder={'Email'}
                                {...register('email')}
                                autoComplete="off"
                                autoCorrect="off"
                                className={css.register__input}
                            />
                            <button className={rootCSS.default__button}>Submit</button>
                            {
                                inputMailError && <div className={css.mail__error}>{inputMailError}</div>
                            }
                        </form>
                    </div>
                </div>
            }
        </>

    );
};

export {LoginWithMetaMask};
