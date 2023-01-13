import React from 'react';
import {useSelector} from 'react-redux';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from "react-router-dom";

import css from './HomePage.module.css';
import {Feedbacks, LeaderBord, SklBanner, TechList, YoutubeChannel} from '../../components';

const HomePage = () => {
    const navigate = useNavigate();
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

            <div className={css.home__page_loginUser}>
                <div className={css.block_loginUser}>
                    <h1 className={css.skilliant}>SKILLIANT</h1>
                    <div className={css.home__description_loginUser}>
                        {EN ? 'We help engineers to grow in IT' :
                            'Ми допомагаємо розробникам розвиватися в ІТ'}
                    </div>
                    {
                        !user &&
                        <button className={css.home__button} onClick={() => navigate('/login')}>Cet started</button>
                    }
                </div>
            </div>
            <TechList/>
            <SklBanner/>
            <LeaderBord/>
            <Feedbacks/>
            <YoutubeChannel/>
        </>
    );
};

export {HomePage};
