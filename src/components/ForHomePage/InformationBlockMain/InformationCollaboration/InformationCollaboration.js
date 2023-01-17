import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import css from '../InformationTesting/InformationTesting.module.css';
import cssThis from './InformationCollaboration.module.css';
import collaboration from '../../../../images/information/collaboration.png';
import {useNavigate} from 'react-router-dom';
import longColorArrow from '../../../../images/information/longColorArrow.svg';

const InformationCollaboration = () => {
    const navigate = useNavigate();
    const {EN} = useSelector(state => state['languageReducers']);
    const [imageCollaborationActive, setImageCollaborationActive] = useState(false);
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
            if (scrollTop >= 2 * window.innerHeight) {
                setImageCollaborationActive(true);
            } else {
                setImageCollaborationActive(false);
            }
        } else if (window.innerWidth > 1200) {
            if (scrollTop >= 1.7 * window.innerHeight) {
                setImageCollaborationActive(true);
            } else {
                setImageCollaborationActive(false);
            }
        } else if (window.innerWidth > 992) {
            if (scrollTop >= 1.65 * window.innerHeight) {
                setImageCollaborationActive(true);
            } else {
                setImageCollaborationActive(false);
            }
        } else if (window.innerWidth > 767) {
            if (scrollTop >= 1.5 * window.innerHeight) {
                setImageCollaborationActive(true);
            } else {
                setImageCollaborationActive(false);
            }
        } else if (window.innerWidth > 576) {
            if (scrollTop >= 1.3 * window.innerHeight) {
                setImageCollaborationActive(true);
            } else {
                setImageCollaborationActive(false);
            }
        } else {
            if (scrollTop >= 1.05 * window.innerHeight) {
                setImageCollaborationActive(true);
            } else {
                setImageCollaborationActive(false);
            }
        }
    }, [scrollTop]);

    return (
        <div className={css.testing__main}>
            <div className={cssThis.testing__animation}>
                <img src={collaboration} alt="testing"
                     className={imageCollaborationActive ? cssThis.testing__img_active : cssThis.testing__img}/>
            </div>

            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>
                    {EN ? 'Collaborative programming'
                        :
                        'Спільне програмування'}
                </h4>

                <h5 className={css.testing__small_header}>
                    {EN ? 'Teamwork is always more effective.'
                        :
                        'Командна робота завжди ефективніша.'}
                </h5>

                <h6 className={css.testing__description}>
                    {EN ? ' Write code together, track changes in real time, solve problems and bugs together too, with ' +
                        'online coding from SKILLIANT.'
                        :
                        'Пишіть код разом, відстежуйте зміни в режимі реального часу, вирішуйте проблеми та помилки ' +
                        'також разом в Інтернеті, кодування від SKILLIANT.'}
                </h6>

                <div className={css.testing__details} onClick={() => navigate('/team-coding')}>
                    {EN ? 'Try now' : 'Спробувати зараз'}
                    <img src={longColorArrow} alt="arrow" className={css.testing__arrow}/>
                </div>
            </div>
        </div>
    );
};

export {InformationCollaboration};
