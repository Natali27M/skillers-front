import React, {useEffect, useState} from 'react';
import css from './NotFoundPage.module.css';
import {useSelector} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';

const NotFoundPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [timeToReturn, setTimeToReturn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTimeToReturn(true);
        }, 3000);
    });

    if (timeToReturn) {

        return <Navigate to="/" replace/>;
    }

    return (
        <div className={css.not__found_page}>
            <div className={css.not__found_title}>
                {EN ? 'Page not found' : 'Сторінку не знайдено'}
            </div>
            <div className={css.not__found_subtitle}>
                {EN ? 'You will be redirected to main page' : 'Вас скерує на головну сторінку'}
            </div>
            <Link to={'/'} className={css.not__found_btn}>
                {EN ? 'To main' : 'На головну'}
            </Link>
        </div>
    );
};

export {NotFoundPage};