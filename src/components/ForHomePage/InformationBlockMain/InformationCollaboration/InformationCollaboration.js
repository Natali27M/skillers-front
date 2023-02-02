import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import css from '../InformationTesting/InformationTesting.module.css';
import cssThis from './InformationCollaboration.module.css';
import collaboration from '../../../../images/information/collaboration.svg';
import longColorArrow from '../../../../images/information/longColorArrow.svg';

const InformationCollaboration = ({setGetLeaderBoard}) => {
    const navigate = useNavigate();
    const {EN} = useSelector(state => state['languageReducers']);
    const [scrollTop, setScrollTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            let element = document.querySelector('#collaborationInfo');
            let position;
            if (element !== null) {
                position = element.getBoundingClientRect();
            } else {
                return;
            }

            if (position.top < window.innerHeight && position.bottom >= 0) {
                setScrollTop(true);
                setGetLeaderBoard(true);
            }
        });
    }, [scrollTop]);

    return (<div id="collaborationInfo" className={css.testing__main}>
            <div className={cssThis.testing__animation} onClick={() => navigate('/team-coding')}>
                <img src={collaboration} alt="testing"
                     className={scrollTop ? cssThis.testing__img_active : cssThis.testing__img}/>
            </div>

            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>
                    {EN ? 'Collaborative programming' : 'Спільне програмування'}
                </h4>

                <h5 className={css.testing__small_header}>
                    {EN ? 'Teamwork is always more effective.' : 'Командна робота завжди ефективніша.'}
                </h5>

                <h6 className={css.testing__description}>
                    {EN ? ' Write code together, track changes in real time, solve problems and bugs together too, with ' + 'online coding from SKILLIANT.' : 'Пишіть код разом, відстежуйте зміни в режимі реального часу, вирішуйте проблеми та помилки ' + 'також разом в Інтернеті, кодування від SKILLIANT.'}
                </h6>

                <div className={css.testing__details} onClick={() => navigate('/team-coding')}>
                    {EN ? 'Try now' : 'Спробувати зараз'}
                    <img src={longColorArrow} alt="arrow" className={css.testing__arrow}/>
                </div>
            </div>
        </div>);
};

export {InformationCollaboration};
