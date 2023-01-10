import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {Link, Navigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import rootCSS from '../../styles/root.module.css'
import css from './RegisterPage.module.css';
import logo from '../../images/header/SKILLERS.svg';
import {UserValidator} from '../../validation';
import {clearError, registration} from '../../store';
import googleLogo from '../../images/google.svg';
import baseURL from '../../config/urls';
import {LoginWithMetaMask} from "../../components";


const RegisterPage = () => {
    const {user, error} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);

    const {
        register, handleSubmit, formState: {errors}
    } = useForm({resolver: joiResolver(UserValidator)});

    const [repeatError, setRepeatError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError());
    }, []);


    const makeRegister = (obj) => {
        if (obj.password === obj.repeatPassword) {
            const regObj = {
                username: obj.username,
                email: obj.email,
                password: obj.password,
            };
            dispatch(registration(regObj));
            setRepeatError(false);
        } else {
            setRepeatError(true);
        }
    };


    if (user) {
        return <Navigate to="/" replace/>;
    }

    const title = 'Registration user';
    const description = 'User login form';
    const url = 'https://skilliant.net/registration';

    return (
        <div className={css.register__page}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="skilliant.net"/>
                <title>{title}</title>
                <link rel="canonical" href={url}/>
            </Helmet>

            <div className={css.register__left}>
                <img className={css.home__logo} src={logo} alt="logo"/>
                <div className={css.home__description}>
                    {EN ? 'We help engineers to grow in IT' :
                        'Ми допомагаємо розробникам розвиватися в ІТ'}
                </div>
            </div>
            <div className={css.register__right}>
                <form onSubmit={handleSubmit(makeRegister)} className={css.register__form}>
                    <input
                        type="text"
                        placeholder={EN ? 'Username' : 'Нікнейм'}
                        {...register('username')}
                        className={css.register__input}
                    />
                    {errors.username &&
                        <div className={css.error}>
                            {EN ? 'Wrong username' : 'Помилка нікнейму'}
                        </div>
                    }

                    <input
                        type="text"
                        placeholder={EN ? 'Email' : 'Пошта'}
                        {...register('email')}
                        autoComplete="off"
                        autoCorrect="off"
                        className={css.register__input}
                    />
                    {errors.email &&
                        <div className={css.error}>
                            {EN ? 'Wrong email' : 'Помилка пошти'}
                        </div>
                    }

                    <input
                        type="password"
                        placeholder={EN ? 'Password' : 'Пароль'}
                        autoComplete="off"
                        {...register('password')}
                        className={css.register__input}
                    />

                    {errors.password &&
                        <div className={css.error}>
                            {EN ? 'The password must be no shorter than 6 characters, contain numbers and letters'
                                :
                                'Пароль має бути не коротшим як 6 символів, містити цифри та літери'}
                        </div>
                    }

                    <input
                        type="password"
                        placeholder={EN ? 'Repeat password' : 'Повторіть пароль'}
                        autoComplete="off"
                        {...register('repeatPassword')}
                        className={css.register__input}
                    />

                    {errors.repeatPassword &&
                        <div className={css.error}>
                            {EN ? 'The password must be no shorter than 6 characters, contain numbers and letters'
                                :
                                'Пароль має бути не коротшим як 6 символів, містити цифри та літери'}
                        </div>
                    }

                    {repeatError &&
                        <div className={css.error}>
                            {EN ? 'Error repeat password' : 'Помилка повтору пароля'}
                        </div>
                    }
                    {error &&
                        <div
                            className={css.error}>
                            {EN ? 'User with such email or username already registered' :
                                'Користувач з таким емейлом або нікнеймом вже зареєстрований'
                            }
                        </div>}
                    <Link to={'/policy'} className={css.policy__link}>
                        {EN ? 'By registering, you consent to the processing of your personal data. View privacy policy'
                            :
                            'Реєструючись, ви даєте згоду на обробку ваших персональних даних. Переглянути політику конфіденційності'
                        }
                    </Link>
                    <button className={rootCSS.default__button}>{EN ? 'SIGN UP' : 'ЗАРЕЄСТРУВАТИСЯ '}</button>
                </form>
                <div className={css.google__login__btn} onClick={() =>
                    (window.location = `${baseURL}/api/connect/google`)
                }>
                    <img src={googleLogo} alt="google"/> Google login
                </div>
                <LoginWithMetaMask/>
            </div>
        </div>
    );
};

export {RegisterPage};
