import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import css from './HomePage.module.css';
import {Feedbacks, InformationBlock, LeaderBord, SklBanner, TechList, YoutubeChannel} from '../../components';

const HomePage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);

    // const present = JSON.parse(localStorage.getItem('present'));

    const title = 'SKILLIANT - we help engineers to grow in IT';
    const description = 'Skilliant is a free online quiz platform that allows you to practice your skills and learn new ones';
    const url = 'https://skilliant.net';

    return (
        <>
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

            {user ?
                <div className={css.home__page_loginUser}>
                    <div className={css.block_loginUser}>
                        <div className={css.home__description_loginUser}>
                            {EN ? 'We help engineers to grow in IT' :
                                'Ми допомагаємо розробникам розвиватися в ІТ'}
                        </div>
                    </div>
                </div>

                :

                <div>
                    <div className={css.home__page}>
                        {/*<img className={css.home__logo} src={logo} alt="logo"/>*/}
                        <h1 className={css.main__title}>
                            SKILLIANT
                        </h1>
                        <h2 className={css.home__description}>
                            {EN ? 'We help engineers to grow in IT' :
                                'Ми допомагаємо розробникам розвиватися в ІТ'}
                        </h2>
                        <Link to={user ? '/user' : '/registration'} className={css.register__btn}>
                            {user ? (EN ? 'To my profile' : 'На мій профіль') : (EN ? 'Register now' : 'Зареєструватися')}
                        </Link>
                    </div>
                </div>
            }
            <TechList/>
            <InformationBlock/>
            <SklBanner/>
            <LeaderBord/>
            <Feedbacks/>
            <YoutubeChannel/>
        </>
    );
};

export {HomePage};
