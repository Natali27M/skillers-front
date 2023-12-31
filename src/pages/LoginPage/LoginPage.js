import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {Link, Navigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import {LoginValidator} from '../../validation';
import css from '../RegisterPage/RegisterPage.module.css';
import rootCSS from '../../styles/root.module.css'
import logo from '../../images/header/SKILLERS.svg';
import googleLogo from '../../images/google.svg'
import {clearError, login} from '../../store';
import baseURL from '../../config/urls';
import {LoginWithMetaMask} from '../../components';

const LoginPage = () => {
    const {user, jwt, error} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError());
    }, []);

    const {
        register, handleSubmit, formState: {errors}
    } = useForm({resolver: joiResolver(LoginValidator)});

    const makeLogin = (obj) => {
        dispatch(login(obj));
    };

    if (user) {
        return <Navigate to="/" replace/>;
    }

    const title = 'Login user';
    const description = 'Skilliant is a free online quiz platform that allows you to practice your skills and learn new ones';
    const url = 'https://skilliant.net/login';

    return (
        <div className={css.login__page}>
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

            <div className={css.register__right}>
                <form onSubmit={handleSubmit(makeLogin)} className={css.register__form}>
                    <input
                        type="text"
                        placeholder={EN ? 'Email' : 'Пошта'}
                        {...register('identifier')}
                        autoComplete="off"
                        autoCorrect="off"
                        className={css.register__input}
                    />

                    {errors.identifier &&
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

                    <Link to={'/registration'} className={css.toRegister__link}>
                        {EN ? <span> You haven't profile? <br/>Sign up </span> :
                            <span>У вас немає облікового засобу? <br/>Зареєструватися</span>}
                    </Link>
                    {error &&
                        <div
                            className={css.error}>
                            {EN ? 'Incorrect email or password' :
                                'Не правильний емейл або пароль'
                            }
                        </div>}
                    <button className={rootCSS.default__button}>{EN ? 'SIGN IN' : 'УВІЙТИ'}</button>
                </form>
                <div className={css.google__login__btn} onClick={() =>
                    (window.location = `${baseURL}/api/connect/google`)
                }>
                    <img src={googleLogo} alt="google"/> Google login
                </div>

                <LoginWithMetaMask/>

            </div>
            <div className={css.register__left}>
                <img className={css.home__logo} src={logo} alt="logo"/>
                <div className={css.home__description}>
                    {EN ? 'We help engineers to grow in IT' :
                        'Ми допомагаємо розробникам розвиватися в ІТ'}
                </div>
            </div>
        </div>
    );
};

export {LoginPage};
