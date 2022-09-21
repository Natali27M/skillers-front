import React from 'react';
import {useSelector} from 'react-redux';
import css from './Footer.module.css';


const Footer = () => {
    const {EN} = useSelector(state => state['languageReducers']);


    return (
        <div className={css.main__footer}>
            {EN ? 'All rights reserved 2022' : 'Всі права захищено'}
        </div>
    );
};

export {Footer};