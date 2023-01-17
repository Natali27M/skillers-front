import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import testing from '../../../../images/information/testing.png'
import longColorArrow from '../../../../images/information/longColorArrow.svg'
import css from './InformationTesting.module.css';
import cssThis from '../InformationCollaboration/InformationCollaboration.module.css';
import {useSelector} from 'react-redux';

const InformationTesting = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const [imageTestingActive, setImageTestingActive] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollTop]);

    useEffect(() => {
            if (window.innerWidth > 1300) {
                if (scrollTop >= 1.5 * window.innerHeight) {
                    setImageTestingActive(true);
                } else {
                    setImageTestingActive(false);
                }
            } else if (window.innerWidth > 1200) {
                if (scrollTop >= 0.95 * window.innerHeight) {
                    setImageTestingActive(true);
                } else {
                    setImageTestingActive(false);
                }
            } else if (window.innerWidth > 767) {
                if (scrollTop >= window.innerHeight) {
                    setImageTestingActive(true);
                } else {
                    setImageTestingActive(false);
                }
            } else if (window.innerWidth > 576) {
                if (scrollTop >= 0.95 * window.innerHeight) {
                    setImageTestingActive(true);
                } else {
                    setImageTestingActive(false);
                }
            } else {
                if (scrollTop >= 0.85 * window.innerHeight) {
                    setImageTestingActive(true);
                } else {
                    setImageTestingActive(false);
                }
            }
        }
        ,
        [scrollTop]
    )
    ;

    window.addEventListener('load', function () {
        navigate('/');
    })

    return (
        <div className={css.testing__main}>
            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>
                    {EN ? 'Testing' :
                        'Тестування'}
                </h4>

                <h5 className={css.testing__small_header}>
                    {EN ? 'Only the method of trial and error guarantees development.'
                        :
                        'Тільки методом проб і помилок гарантує розвиток'}
                </h5>

                <h6 className={css.testing__description}>
                    {EN ? 'Test your skills, create your own tests and get rewards and coins for it.'
                        :
                        'Перевірте свої навички, створіть власні тести та отримуйте за це нагороди та монети.'}
                </h6>

                <a href="#testing" className={css.testing__details}>
                    {EN ? 'Try now' : 'Спробувати зараз'}
                    <img src={longColorArrow} alt="arrow" className={css.testing__arrow}/>
                </a>
            </div>

            <div className={cssThis.testing__animation}>
                <img src={testing} alt="testing"
                     className={imageTestingActive ? cssThis.testing__img_active : cssThis.testing__img}/>
            </div>
        </div>
    );
};

export {InformationTesting};
