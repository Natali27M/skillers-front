import React, {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import css from './VacancyResponsesPage.module.css';
import employerCss from '../EmployerPage/EmployerPage.module.css';

import {getOneVacancy} from '../../store/slices/vacancy.slice';
import {useDispatch, useSelector} from 'react-redux';
import {Helmet} from 'react-helmet-async';
import {getResponsesByVacancy} from '../../store/slices/vacancyResponses.slice';
import {PaginationSmall, ResponseBlock} from '../../components';

const VacancyResponsesPage = () => {
    const {vacancyId} = useParams();

    const {vacancy} = useSelector(state => state['vacancyReducers']);

    const {responsesPage} = useSelector(state => state['vacancyResponseReducers']);

    const {EN} = useSelector(state => state['languageReducers']);

    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(responsesPage);
    }, [responsesPage]);

    useEffect(() => {
        dispatch(getOneVacancy(vacancyId));
        dispatch(getResponsesByVacancy({vacancyId, pageNumber}));
    }, [vacancyId]);

    const title = `${vacancy?.attributes?.title || 'Vacancy'} responses`;
    const description = 'View responses to your job opening';
    const url = `https://skilliant.net/vacancy-responses/${vacancyId}`;

    return (
        <div className={employerCss.employer__page}>
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
            <div className={employerCss.employer__wrap}>
                <div className={employerCss.employer__header}>
                    <h2 className={employerCss.employer__title}>
                        {vacancy?.attributes?.title && (EN ? `${vacancy?.attributes?.title} responses` : `${vacancy?.attributes?.title} відгуки`)}
                    </h2>
                </div>
                {responsesPage?.data?.map(response => <ResponseBlock key={response?.id} response={response}/>)}
                {!!responsesPage?.data?.length &&
                    <PaginationSmall
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        pageCount={responsesPage?.meta?.pagination?.pageCount}
                    />
                }
            </div>
        </div>
    );
};

export {VacancyResponsesPage};
