import React from 'react';
import {useSelector} from 'react-redux';
import css from './Footer.module.css';
import {Link} from 'react-router-dom';


const Footer = () => {
    const {EN} = useSelector(state => state['languageReducers']);


    return (
        <div className={css.main__footer}>
            <div>{EN ? 'All rights reserved 2022' : 'Всі права захищено'}</div>
            <Link to={'/policy'} className={css.privacy__link}>{EN ? 'Privacy policy' : 'Політика конфіденційності'}</Link>
        </div>
    );
};

export {Footer};