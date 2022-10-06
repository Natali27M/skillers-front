import React from 'react';
import {useNavigate} from 'react-router-dom';
import arrow from '../../../images/arrow-back.svg'

import css from './BackButton.module.css'
import {useSelector} from 'react-redux';

const BackButton = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const navigate = useNavigate()

    return (
        <button className={css.back__btn} onClick={() => navigate(-1)}>
            <img className={css.arrow__img} src={arrow} alt="arrow"/>
            <div>
                {EN ? 'Back' : 'Назад'}
            </div>
        </button>
    );
};

export {BackButton};