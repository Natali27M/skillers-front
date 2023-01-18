import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import css from '../InformationTesting/InformationTesting.module.css';
import cssThis from '../InformationCollaboration/InformationCollaboration.module.css';
import telegram from '../../../../images/information/telegramChat.svg';
import longColorArrow from '../../../../images/information/longColorArrow.svg';
import {Link} from 'react-router-dom';

const InformationTelegram = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const [scrollTop, setScrollTop] = useState(false);

    useEffect(() => {
            window.addEventListener('scroll', function () {
                let element = document.querySelector('#telegramInfo');
                let position = element.getBoundingClientRect();

                if (position.top < window.innerHeight && position.bottom >= 0) {
                    setScrollTop(true);
                }
            });
        }
        ,
        [scrollTop]
    );

    return (
        <div id="telegramInfo" className={css.testing__main}>
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
                <a href="https://t.me/SkilliantBot" className={cssThis.testing__animation}>
                    <img src={telegram} alt="testing"
                         className={scrollTop ? cssThis.testing__img_active : cssThis.testing__img}/>
                </a>
            </div>
        </div>
    );
};

export {InformationTelegram};
