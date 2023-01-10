import React from 'react';
import {useSelector} from 'react-redux';
import {Helmet} from 'react-helmet-async';

import rootCSS from '../../styles/root.module.css'
import css from './DonationPage.module.css'
import logo from '../../images/header/SKILLERS.svg'

const DonationPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const title = 'SKILLIANT - We help engineers to grow in IT';
    const description = 'We will be very happy about your financial support of the project. Each of your donations will' +
        ' go towards increasing the test base, improving functionality and design';
    const url = 'https://skilliant.net/donation';

    return (
        <div className={css.donation__page}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="skilliant.net"/>
                <title>{title}</title>
                <link rel="canonical" href={url}/>
            </Helmet>

            <div className={css.logo__wrap}>
                <img src={logo} alt="logo" className={css.skilliant__logo}/>
                <div className={css.skilliant__description}>
                    {EN ? 'We help engineers to grow in IT' :
                        'Ми допомагаємо розробникам розвиватися в ІТ'}
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
                <a className={rootCSS.default__button} target={'_blank'} href="https://www.patreon.com/user?u=30852980">
                    {EN ? 'DONATE' : 'ДОНАТИТИ'}
                </a>
            </div>
        </div>
    );
};

export {DonationPage};
