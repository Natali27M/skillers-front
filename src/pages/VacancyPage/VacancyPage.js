import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ReactMarkdown from 'react-markdown';

import {getOneVacancy} from '../../store/slices/vacancy.slice';
import css from './VacancyPage.module.css';
import {Helmet} from 'react-helmet-async';

import experience from '../../images/vacancy/experience.svg';
import english from '../../images/vacancy/english.svg';
import calendar from '../../images/vacancy/calendar.svg';
import people from '../../images/vacancy/people.svg';
import vacanciesExperienceDisplay from '../../RootFunctions/vacanciesExperienceDisplay';
import vacancyTimeDisplay from '../../RootFunctions/vacancyTimeDisplay';
import vacanciesReviewDisplay from '../../RootFunctions/vacanciesReviewDisplay';
import rootCss from '../../styles/root.module.css';
import {ResponseModal} from '../../components';

const VacancyPage = () => {
    const {vacancyId} = useParams();

    const {vacancy} = useSelector(state => state['vacancyReducers']);

    const {EN} = useSelector(state => state['languageReducers']);

    const dispatch = useDispatch();

    const [responseTime, setResponseTime] = useState(false);

    useEffect(() => {
        dispatch(getOneVacancy(vacancyId));
    }, [vacancyId]);

    useEffect(() => {
        responseTime ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }, [responseTime, setResponseTime]);


    const title = vacancy?.attributes?.title || 'Vacancy';
    const description = vacancy?.attributes?.subtitle || 'Get acquainted with the list of vacancies and choose the one that suits you';
    const url = `https://skilliant.net/vacancy/${vacancyId}`;

    return (
        <div className={css.vacancy__page}>
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
            {responseTime && <ResponseModal vacancy={vacancy} setResponseTime={setResponseTime}/>}
            <div className={css.vacancy__wrap}>
                <div className={css.vacancy__main}>
                    <div className={css.vacancy__header}>
                        <h1 className={css.vacancy__title}>
                            {vacancy?.attributes?.title}
                        </h1>
                        <h5 className={css.vacancy__salary}>{vacancy?.attributes?.salary}{!!vacancy && '$'}</h5>
                    </div>
                    <p className={css.vacancy__subtitle}>
                        {vacancy?.attributes?.subtitle}
                    </p>
                    <ReactMarkdown className={css.vacancy__description}>
                        {vacancy?.attributes?.description}
                    </ReactMarkdown>
                    {vacancy?.attributes?.companyWebsite &&
                        <>
                            <p className={css.website__title}>
                                {EN ? 'Company website' : 'Сайт компанії'}
                            </p>
                            <a
                                className={css.vacancy__website}
                                href={`https://${vacancy?.attributes?.companyWebsite}`}
                                target="_blank"
                            >
                                {vacancy?.attributes?.companyWebsite}
                            </a>
                        </>
                    }
                </div>
                {!!vacancy && <div className={css.vacancy__info}>
                    <div className={css.vacancy__info_block}>
                        <img src={experience} alt="experience"/>
                        <h6>{vacanciesExperienceDisplay(vacancy?.attributes?.experience, EN)}</h6>
                    </div>
                    <div className={css.vacancy__info_block}>
                        <img src={english} alt="english"/>
                        <h6>{vacancy?.attributes?.englishLevel}</h6>
                    </div>
                    <div className={css.vacancy__info_block}>
                        <img src={calendar} alt="calendar"/>
                        <h6>{vacancyTimeDisplay(vacancy?.attributes?.createdAt, EN)}</h6>
                    </div>
                    <div className={css.vacancy__info_block}>
                        <img src={people} alt="people"/>
                        <h6>{vacanciesReviewDisplay(vacancy?.attributes?.reviews, EN)}</h6>
                    </div>
                    <button onClick={() => setResponseTime(true)} className={rootCss.default__button}>
                        {EN ? 'Reply to the vacancy' : 'Відповісти на вакансію'}
                    </button>
                </div>}
            </div>
        </div>
    );
};

export {VacancyPage};
