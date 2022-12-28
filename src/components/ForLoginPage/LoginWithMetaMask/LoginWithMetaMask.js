import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {ethers} from 'ethers';

import {MetamaskService} from '../../../services/metamask.service';
import {userServices} from '../../../services';
import {login, registration} from '../../../store';
import rootCSS from '../../../styles/root.module.css';
import css_helper from '../../../pages/RegisterPage/RegisterPage.module.css';
import css from './LoginWithMetaMask.module.css';
import metamask from '../../../images/metamask.svg';
import {Navigate} from 'react-router-dom';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {emailValidation} from '../../../validation/email.validation';

const LoginWithMetaMask = () => {
    const {user, error} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);

    const dispatch = useDispatch();
    const {
        reset, register, handleSubmit, formState: {errors}
    } = useForm({resolver: joiResolver(emailValidation)});


    const [loading, setLoading] = useState();
    const [err, setErr] = useState(null);
    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState(null);
    const [inputMailError, setInputMailError] = useState(null);

    const loginWithMetaMask = async () => {
        try {
            setLoading(EN ? 'Connecting to your wallet ...' : 'Підключення до вашого гаманця...');

            if (!window.ethereum) return setLoading(EN ? 'Please install MetaMask or use the MetaMask browser!'
                :
                '«Будь ласка, встановіть MetaMask або використовуйте браузер MetaMask!»');

            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const walletAddress = await signer.getAddress();
            setAddress(walletAddress);

            const {data} = await MetamaskService.nonce(walletAddress);
            setLoading(EN ? 'Please, sign a message...' : 'Будь ласка, підпишіть повідомлення...');

            const signature = await signer.signMessage(data?.nonce);
            if (!signature) {
                return setLoading('');
            }

            setLoading(EN ? 'Verifying...' : 'Перевірка...');
            const response = await MetamaskService.verify(walletAddress, signature, data?.nonce);
            const email = response?.data?.data[0]?.attributes?.email;

            if (!response.data.data.length && !email) {
                throw new Error(EN ? 'Email or verification error...' : 'Помилка емейлу або верифікації...');
            }

            if (response.data.data.length && email) {
                setLoading(EN ? 'Please wait...' : 'Будь ласка, зачекайте...');
                const user = await userServices.getUserByEmail(email);
                if (user.length > 0) {
                    return makeLogin({
                        identifier: email,
                        password: walletAddress,
                    });
                }
                const index = email.indexOf('@');
                const nickName = email.slice(0, index);

                await dispatch(registration({
                    username: nickName,
                    email: email,
                    password: walletAddress,
                    wallet: walletAddress,
                }));

                return makeLogin({
                    identifier: email, password: walletAddress,
                });
            }

            if (response.data.data.length && !email) {
                setLoading(EN ? 'Waiting for form data...' : 'Очікування даних форми...');
                return setModal(!modal);
            }

        } catch (e) {
            setLoading('');
            setErr(e.message);
        }
    };

    const makeLogin = async (obj) => {
        await dispatch(login(obj));
    };
    const formHandler = async (obj) => {
        const userWithEmailExist = await userServices.getUserByEmail(obj.email);
        if (userWithEmailExist.length > 0) {
            setInputMailError(`${EN ? 'This email already exist....' : 'Така електронна адреса уже існує...'}`);
            return setTimeout(() => {
                setInputMailError('');
            }, 4000);
        }
        const response = await MetamaskService.saveEmail(obj.email, address);

        const index = obj.email.indexOf('@');
        const nickName = obj.email.slice(0, index);

        await dispatch(registration({
            username: nickName,
            email: response?.data?.email,
            wallet: address,
            password: address,
        }));
    };

    useEffect(() => {
        if (user) {
            return <Navigate to="/" replace/>;
        }
    }, [user, error]);

    return (<>
            <div className={css_helper.google__login__btn} onClick={loginWithMetaMask}>
                <div className={css.login__button}>
                    <img src={metamask} alt="metamask" className={css.metamask__icon}/>
                    {EN ? 'MetaMask login' : 'Увійдіть з MetaMask'}
                </div>
            </div>

            {loading && <h3 className={css.loading}>{loading}</h3>}
            {/*{err && <h3 className={css.mail__error}>{err}</h3>}*/}

            {modal && <div className={css.modal__container}>
                <div className={css.modal__block}>
                    <div className={css.register__header}>
                        {EN ?
                            'Please enter your email address, you only need to do this once'
                            :
                            'Будь ласка, введіть свою електронну адресу, це потрібно зробити тільки один раз'}
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
                        {inputMailError && <div className={css.mail__error}>{inputMailError}</div>}
                        {errors.email && <div
                            className={css.mail__error}>{EN ? 'Please enter a valid email address, example : example@example.com' :
                            'Введіть дійсну адресу електронної пошти, наприклад: example@example.com'}</div>}
                    </form>
                </div>
            </div>}
        </>

    );
};

export {LoginWithMetaMask};
