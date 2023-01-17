import React from 'react';
import {useSelector} from 'react-redux';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from 'swiper';

import 'swiper/css/autoplay';
import css from './HomePage.module.css';
import {Feedbacks, LeaderBord, SklBanner, TechList, YoutubeChannel} from '../../components';

import tests from '../../images/slides/tests.png';
import collaborative from '../../images/slides/collaborative.png';
import telegram from '../../images/slides/telegram.png';
import mentors from '../../images/slides/mentors.png';

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
                        <div className={css.swiper__block__skilliant}>SKILLIANT</div>
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
                                            <div className={css.slide__img__block}>
                                                <img src={tests} alt="tests" className={css.testing}/>
                                            </div>
                                            <div
                                                className={css.slide__description}>{EN ? "Testing" : "Тестування"}</div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className={css.slide__block}>
                                            <div className={css.slide__img__block}>
                                                <div className={css.slide__img__block}>
                                                    <img src={collaborative} alt="collaborative"
                                                         className={css.collaborative}/>
                                                </div>
                                            </div>
                                            <div
                                                className={css.slide__description}>{EN ? "Collaborative programming" : "Спільне програмування"}</div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className={css.slide__block}>
                                            <div className={css.slide__img__block}>
                                                <div className={css.slide__img__block}>
                                                    <img src={telegram} alt="telegram" className={css.telegram}/>
                                                </div>
                                            </div>
                                            <div
                                                className={css.slide__description}>{EN ? "Telegram chatbot" : "Телеграм чат-бот"}</div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className={css.slide__block}>
                                            <div className={css.slide__img__block}>
                                                <div className={css.slide__img__block}>
                                                    <img src={mentors} alt="mentors" className={css.mentoring}/>
                                                </div>
                                            </div>
                                            <div
                                                className={css.slide__description}>{EN ? "Mentoring" : "Менторство"}</div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
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
