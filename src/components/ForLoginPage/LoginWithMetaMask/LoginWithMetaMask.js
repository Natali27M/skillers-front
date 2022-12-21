import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {ethers} from 'ethers'

import css_helper from "../../../pages/RegisterPage/RegisterPage.module.css";
import css from './LoginWithMetaMask.module.css'
import {MetamaskService} from "../../../services/metamask.service";
import {userServices} from "../../../services";
import {login, registration} from "../../../store";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const LoginWithMetaMask = () => {
    const {user} = useSelector(state => state['userReducers']);
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();


    const [loading, setLoading] = useState();
    const [err, setErr] = useState(null);
    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState(null);

    const loginWithMetaMask = async () => {
        try {
            setLoading("Connecting to your wallet ...")

            if (!window.ethereum) return setErr("Please install a MetaMask !")

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const walletAddress = await signer.getAddress()
            setAddress(walletAddress);

            const {data} = await MetamaskService.nonce(walletAddress);
            setLoading("Please, signe a message...")

            const signature = await signer.signMessage(data?.nonce);

            const response = await MetamaskService.verify(walletAddress, signature, data?.nonce);
            const email = response?.data?.data[0]?.attributes?.email;

            if (!response.data.data.length && !email) {
                throw new Error('Email or verify error....')
            }

            if (response.data.data.length && email) {
                setLoading("Please wait...")
                const user = await userServices.getUserByEmail(email);
                console.log(user);
                if (user.length > 0) {
                    return makeLogin({
                        identifier: email,
                        password: walletAddress,
                    })
                }
                await dispatch(registration({
                    username: address,
                    email: email,
                    password: address,
                }))

                return makeLogin({
                    identifier: email,
                    password: walletAddress,
                })
            }

            if (response.data.data.length && !email) {
                return setModal(!modal)
            }

        } catch (e) {
            setErr(e.message)
        }
    }


    const makeLogin = async (obj) => {
        await dispatch(login(obj));
    };
    const formHandler = async ({email}) => {
        const response = await MetamaskService.saveEmail(email, address);
        await dispatch(registration({
            username: address,
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
            {loading && <h3>{loading}</h3>}
            <div className={css_helper.google__login__btn} onClick={loginWithMetaMask}>
                Login with MetaMask
            </div>

            {
                err && <h3>{err}</h3>
            }

            {modal &&
                <div className={css.modal__container}>
                    <div className={css.modal__block}>
                        <h5>Please input you email, it will be only one time</h5>
                        <form onSubmit={handleSubmit(formHandler)}>
                            <input
                                type="text"
                                placeholder={'Email'}
                                {...register('email')}
                                autoComplete="off"
                                autoCorrect="off"
                            />
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>

    );
};

export {LoginWithMetaMask};
