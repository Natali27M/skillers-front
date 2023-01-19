import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './Footer.module.css';
import telegram from '../../../images/telegram.png';
import email from '../../../images/email.png';
import cross from '../../../images/cross.svg';
import {createFeedback} from '../../../store';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {FeedbackValidator} from '../../../validation';
import new_icon from '../../../images/new_icon.svg';



const Footer = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [emailCopyTime, setEmailCopyTime] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: joiResolver(FeedbackValidator)});

    const dispatch = useDispatch();

    const emailCopy = () => {
        setEmailCopyTime(true);
        navigator.clipboard.writeText('support@skilliant.net');
        setTimeout(() => {
            setEmailCopyTime(false);
        }, 1000);

    };

    const makeFeedback = (obj) => {
        dispatch(createFeedback(obj));
        reset();
        setModalOpen(true);
        setTimeout(() => {
            setModalOpen(false);
        }, 2000);
    };

    return (
        <div className={css.main__footer}>
            <div className={css.top__footer}>
                <div className={css.block__pages}>
                    <Link to={'/for-users'}
                          className={css.pages__link}>
                        {EN ? 'For users' : 'Користувачам'}
                    </Link>

                    <Link to={'/compiler'}
                          className={css.pages__link}>
                        {EN ? 'Compiler' : 'Компілятор'}
                    </Link>

                    <Link to={'/team-coding'}
                          className={css.pages__link}>
                        {EN ? 'Collaborative programming' : 'Спільне програмування'}
                    </Link>

                    <Link to={'/learning-plan'}
                          className={css.pages__link}>
                        {EN ? 'Learning plans' : 'Навчальні плани'}
                    </Link>

                    <Link to={'/createTest'}
                          className={css.pages__link}>
                        {EN ? 'Create quiz' : 'Створити тест'}
                    </Link>

                    <Link to={'/rank'}
                          className={css.pages__link}>
                        {EN ? 'Rank table' : 'Таблиця рангів'}
                    </Link>
                </div>

                <div className={css.footer__contact}>
                    <div className={css.footer__telegram}>
                        <a href="https://t.me/skilliant" target="_blank" className={css.pages__link}>
                            <img src={telegram} alt="t.me/skilliant"/> SKILLIANT
                        </a>
                    </div>
                    <div onClick={() => emailCopy()} className={css.footer__email}>
                        <img src={email} alt="t.me/skilliant"/>
                        {emailCopyTime ? (EN ? 'Copied to clipboard' : 'Скопійовано') : 'support@skilliant.net'}
                    </div>
                </div>

                <div className={css.feedback__form_wrap}>
                    <div className={css.footer__feedback}>
                        {EN ? 'Leave a feedback' : 'Залиште відгук'}
                    </div>
                    <form className={css.feedback__form} onSubmit={handleSubmit(makeFeedback)}>
                        <input
                            type="text"
                            className={errors.userName ? css.feedback__input_error : css.feedback__input}
                            placeholder={EN ? 'Name' : 'Ім\'я'}
                            {...register('userName')}
                        />
                        <input
                            type="text"
                            className={errors.email ? css.feedback__input_error : css.feedback__input}
                            placeholder="Email"

                            {...register('email')}
                        />
                        <textarea
                            className={errors.message ? css.feedback__textarea_error : css.feedback__textarea}
                            placeholder={EN ? 'Message' : 'Відгук'}
                            {...register('message')}
                        />
                        <button className={css.feedback__button}>
                            {EN ? 'Send' : 'Надіслати'}
                        </button>
                    </form>
                    <div className={modalOpen ? css.feedback__modal_open : css.feedback__modal}>
                        {EN ? 'Thank you for your feedback' : 'Дякуємо за ваш відгук'}
                        <img className={css.modal__cross} src={cross} alt="cross" onClick={() => setModalOpen(false)}/>
                    </div>
                </div>

            </div>

            <div className={css.footer__hr}></div>

            <div className={css.footer__private}>
                <div className={css.footer__skilliant}>Skilliant</div>
                <div className={css.footer__privacy}>
                    <Link to={'/policy'}
                          className={css.footer__policy}>
                        {EN ? 'Privacy policy' : 'Політика конфіденційності'}
                    </Link>

                    <div className={css.footer__allRight}>
                        {EN ? 'All rights reserved 2022' : 'Всі права захищено'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Footer};
