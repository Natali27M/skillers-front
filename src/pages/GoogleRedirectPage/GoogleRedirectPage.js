import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {googleAuth} from '../../store';
import css from './GoogleRedirectPage.module.css'

const GoogleRedirectPage = () => {
    const {user, jwt} = useSelector(state => state['userReducers']);
    const {EN} = useSelector(state => state['languageReducers']);



    const dispatch = useDispatch()

    const location = useLocation()
    useEffect(() => {
        if (!location) {
            return <Navigate to={'/login'} replace/>
        }
        const { search } = location
        dispatch(googleAuth(search))
    }, [location])


    if (user) {
        return <Navigate to={'/user'} replace/>
    }

    return (
        <div className={css.google__redirect_page}>
            {EN ? 'Please wait' : 'Будь ласка, зачекайте'}
        </div>
    );
};

export {GoogleRedirectPage};