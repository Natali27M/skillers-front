import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import css from './HomePage.module.css';
import logo from '../../images/header/SKILLERS.svg';
import {LeaderBord, TechList} from '../../components';
import {Link} from 'react-router-dom';
import {getLeaderBord} from '../../store/slices/achievments.slice';

const HomePage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user, jwt} = useSelector(state => state['userReducers']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeaderBord());
    }, []);

    return (
        <>
            <div className={css.home__page}>
                <img className={css.home__logo} src={logo} alt="logo"/>
                <div className={css.home__description}>
                    {EN ? 'Platform for testing your IT skills' :
                        'Платформа для перевірки твоїх IT навичок'}
                </div>
                <Link to={user ? '/user' : '/registration'} className={css.register__btn}>
                    {user ? (EN ? 'To my profile' : 'На мій профіль') : (EN ? 'Register now' : 'Зареєструватися')}
                </Link>
            </div>
            <TechList/>
            <LeaderBord/>
        </>
    );
};

export {HomePage};