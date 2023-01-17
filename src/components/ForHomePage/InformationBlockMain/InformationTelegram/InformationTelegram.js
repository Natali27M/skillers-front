import React, {useEffect, useState} from 'react';

import css from '../InformationTesting/InformationTesting.module.css';
import cssThis from '../InformationCollaboration/InformationCollaboration.module.css';
import telegram from '../../../../images/information/telegramChat.png';
import longColorArrow from '../../../../images/information/longColorArrow.svg';
import {useSelector} from 'react-redux';

const InformationTelegram = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const [imageTelegramActive, setImageTelegramActive] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollTop]);

    useEffect(() => {
        if (window.innerWidth > 1300) {
            if (scrollTop >= 3 * window.innerHeight) {
                setImageTelegramActive(true);
            } else {
                setImageTelegramActive(false);
            }
        } else if (window.innerWidth > 1200) {
            if (scrollTop >= 2.35 * window.innerHeight) {
                setImageTelegramActive(true);
            } else {
                setImageTelegramActive(false);
            }
        } else if (window.innerWidth > 992) {
            if (scrollTop >= 2.25 * window.innerHeight) {
                setImageTelegramActive(true);
            } else {
                setImageTelegramActive(false);
            }
        } else if (window.innerWidth > 767) {
            if (scrollTop >= 1.9 * window.innerHeight) {
                setImageTelegramActive(true);
            } else {
                setImageTelegramActive(false);
            }
        } else if (window.innerWidth > 576) {
            if (scrollTop >= 1.6 * window.innerHeight) {
                setImageTelegramActive(true);
            } else {
                setImageTelegramActive(false);
            }
        }  else if (window.innerWidth > 400) {
            if (scrollTop >= 1.35 * window.innerHeight) {
                setImageTelegramActive(true);
            } else {
                setImageTelegramActive(false);
            }
        }else {
            if (scrollTop >= 1.2 * window.innerHeight) {
                setImageTelegramActive(true);
            } else {
                setImageTelegramActive(false);
            }
        }
    }, [scrollTop]);

    return (
        <div className={css.testing__main}>
            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>
                    {EN ? 'Telegram bot' :
                        'Телеграм бот'}</h4>

                <h5 className={css.testing__small_header}>
                    {EN ? ' Telegram bot makes it possible to pass tests without logging in to the site.'
                        :
                        'Телеграм-бот дає можливість проходити тести без авторизації на сайті.'}
                </h5>

                <p className={css.testing__description}>
                    {EN ? 'In it you have access to all those tests that you can find on the site.'
                        :
                        'У ньому ви маєте доступ до всіх тих тестів, які можете знайти на сайті.'}
                </p>
                <a className={css.testing__details} href="https://t.me/SkilliantBot">
                    {EN ? 'Try now' : 'Спробувати зараз'}
                    <img src={longColorArrow} alt="arrow" className={css.testing__arrow}/>
                </a>
            </div>

            <div className={cssThis.testing__animation}>
                <img src={telegram} alt="testing"
                     className={imageTelegramActive ? cssThis.testing__img_active : cssThis.testing__img}/>
            </div>
        </div>
    );
};

export {InformationTelegram};
