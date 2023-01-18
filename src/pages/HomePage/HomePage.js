import React from 'react';
import {useSelector} from 'react-redux';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from 'swiper';

import 'swiper/css/autoplay';
import css from './HomePage.module.css';
import {Feedbacks, InformationBlock, LeaderBord, SklBanner, TechList, YoutubeChannel} from '../../components';

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
                <div className={css.info__main}>

                    <div className={css.description__block}>
                        <div className={css.home__description_loginUser}>
                            {EN ? 'We help engineers to grow in IT' :
                                'Ми допомагаємо розробникам розвиватися в ІТ'}
                        </div>
                        <div className={css.description}>
                            {
                                EN ? "Join us and enjoy all of Skilliant resources, " +
                                    "from mentoring and recruiting to cross-technology testing and collaborative programming" :
                                    "Приєднуйтесь до нас і насолоджуйтеся всіма ресурсами Skilliant, " +
                                    "від наставництва та найму до крос-технологічного тестування та спільного програмування"
                            }
                        </div>
                        {
                            !user &&
                            <button className={css.home__button}
                                    onClick={() => navigate('/login')}>{EN ? "Get started" : "Розпочати"}</button>
                        }
                    </div>

                    <div className={css.swiper__block__main}>
                        <div className={css.swiper__block__skilliant}><span
                            className={css.skilliant}>{EN ? "What is SKILLIANT?" : 'SKILLIANT це?'}</span></div>
                        <div className={css.swiper__block}>
                            <div className={css.mainSwiper}>
                                <Swiper
                                    modules={[Autoplay]}
                                    slidesPerView={1}
                                    direction={'horizontal'}
                                    loop={true}
                                    speed={800}
                                    autoplay={{delay: 4000}}
                                >
                                    <SwiperSlide>
                                        <div className={css.slide__block}>
                                            <div
                                                className={css.slide__description}>{
                                                EN ? "140 tests and test code from 8 technologies" :
                                                    "140 тестів і тестовий код з 8 технологій"}
                                            </div>
                                            <div className={css.slide__img__block}>
                                                <div className={css.testing}></div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className={css.slide__block}>
                                            <div className={css.slide__description}>
                                                {EN ? "A real-time collaborative programming tool" :
                                                    "Інструмент для спільного програмування в реальному часі"}
                                            </div>
                                            <div className={css.slide__img__block}>
                                                <div className={css.collaborative}></div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className={css.slide__block}>
                                            <div
                                                className={css.slide__description}>{EN ? "Telegram bot for passing tests wherever you are" :
                                                "Telegram бот для проходження тестів, де б ви не були"}
                                            </div>
                                            <div className={css.slide__img__block}>
                                                <div className={css.telegram}></div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className={css.slide__block}>
                                            <div
                                                className={css.slide__description}>{EN ? "A portal for mentoring in many IT technologies" :
                                                "Портал для менторингу в багатьох ІТ-технологіях"}
                                            </div>
                                            <div className={css.slide__img__block}>
                                                <div className={css.mentoring}></div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                </Swiper>
                            </div>
                        </div>
                    </div>

                    {
                        !user &&
                        <button className={css.home__button__new}
                                onClick={() => navigate('/login')}>{EN ? "Get started" : "Розпочати"}</button>
                    }
                </div>
            </div>
            <TechList/>
            <InformationBlock/>
            <LeaderBord/>
            <SklBanner/>
            <Feedbacks/>
            <YoutubeChannel/>
        </>
    );
};

export {HomePage};
