import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import testing from '../../../../images/information/testing.svg';
import longColorArrow from '../../../../images/information/longColorArrow.svg';
import css from './InformationTesting.module.css';
import cssThis from '../InformationCollaboration/InformationCollaboration.module.css';

const InformationTesting = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const [scrollTop, setScrollTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            let element = document.querySelector('#testingInfo');
            let position;
            if (element !== null) {
                position = element.getBoundingClientRect();
            } else {
                return;
            }

            if (position.top < window.innerHeight && position.bottom >= 0) {
                setScrollTop(true);
            }
        });
    }, [scrollTop]);

    return (
        <div id="testingInfo" className={css.testing__main}>
            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>
                    {EN ? 'Testing' : 'Тестування'}
                </h4>

                <h5 className={css.testing__small_header}>
                    {EN ? 'Only the method of trial and error guarantees development.' : 'Тільки методом проб і помилок гарантує розвиток'}
                </h5>

                <h6 className={css.testing__description}>
                    {EN ? 'Test your skills, create your own tests and get rewards and coins for it.' : 'Перевірте свої навички, створіть власні тести та отримуйте за це нагороди та монети.'}
                </h6>

                <div onClick={() => document.getElementById('testing').scrollIntoView()}
                     className={css.testing__details}>
                    {EN ? 'Try now' : 'Спробувати зараз'}
                    <img src={longColorArrow} alt="arrow" className={css.testing__arrow}/>
                </div>
            </div>

            <div className={cssThis.testing__animation}
                 onClick={() => document.getElementById('testing').scrollIntoView()}>
                <img src={testing} alt="testing"
                     className={scrollTop ? cssThis.testing__img_active : cssThis.testing__img}/>
            </div>
        </div>
    );
};

export {InformationTesting};
