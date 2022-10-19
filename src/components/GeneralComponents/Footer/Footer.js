import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './Footer.module.css';



const Footer = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [emailCopyTime, setEmailCopyTime] = useState(false);

    const emailCopy = () => {
        setEmailCopyTime(true);
        navigator.clipboard.writeText('support@skilliant.net');
        setTimeout(() => {
            setEmailCopyTime(false);
        }, 1000);

    };

    return (
        <div className={css.main__footer}>
            <div>
                {EN ? 'All rights reserved 2022' : 'Всі права захищено'}
            </div>
            <Link to={'/feedback'}
                className={css.feedback__link}>
                {EN ? 'Feedback' : "Зворотній зв'язок"}
            </Link>
            <Link to={'/policy'}
                className={css.privacy__link}>
                {EN ? 'Privacy policy' : 'Політика конфіденційності'}
            </Link>
            <div onClick={() => emailCopy()} className={css.email__btn}>
                {emailCopyTime ? (EN ? 'Copied to clipboard' : 'Скопійовано') : 'support@skilliant.net'}
            </div>
        </div>
    );
};

export {Footer};