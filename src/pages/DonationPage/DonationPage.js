import React from 'react';
import rootCSS from '../../styles/root.module.css'
import css from './DonationPage.module.css'
import logo from '../../images/header/SKILLERS.svg'
import {useSelector} from 'react-redux';

const DonationPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.donation__page}>
            <div className={css.logo__wrap}>
                <img src={logo} alt="logo" className={css.skilliant__logo}/>
                <div className={css.skilliant__description}>
                    {EN ? 'Platform for testing your IT skills' :
                        'Платформа для перевірки твоїх IT навичок'}
                </div>
            </div>
            <div className={css.donation__content}>
                <div className={rootCSS.default__title_34}>
                    {EN ? 'Support the project financially' : 'Підтримайте проект фінансово'}
                </div>
                <div className={css.donation__subtitle}>
                    {EN ?
                        'We will be very happy about your financial support of the project.' +
                        ' Each of your donations will go towards increasing the test base, ' +
                        'improving functionality and design'
                        :
                        'Ми будемо дуже раді вашій фінансовій підтримці проекту. Кожен ваш донат ' +
                        'піде на збільшення бази тестів, покращення функціоналу та дизайну'}
                </div>
                <a className={rootCSS.default__button} href="#">
                    {EN ? 'DONATE' : 'ДОНАТИТИ'}
                </a>
            </div>
        </div>
    );
};

export {DonationPage};