import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import css from './VacanciesPage.module.css';
import rootCss from '../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getVacanciesPaginated} from '../../store/slices/vacancy.slice';
import {PaginationSmall, VacancyBlock} from '../../components';

const VacanciesPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {technologies} = useSelector(state => state['technologiesReducers']);

    const {vacanciesPage} = useSelector(state => state['vacancyReducers']);

    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVacanciesPaginated(pageNumber));
    }, [pageNumber]);


    const title = 'SKILLIANT vacancies';
    const description = 'Get acquainted with the list of vacancies and choose the one that suits you';
    const url = 'https://skilliant.net/vacancies';

    return (
        <div className={css.vacancies__page}>
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
            <div className={rootCss.root__background}></div>
            <div className={css.vacancies__wrap}>
                <div className={css.result__vacancies}>
                    <h3 className={rootCss.default__title_24}>
                        {EN ? 'Vacancies' : 'Вакансії'}
                    </h3>
                    {vacanciesPage.data.map(vacancy =>
                        <VacancyBlock vacancy={vacancy.attributes} id={vacancy?.id}
                                      key={vacancy?.id}/>
                    )}
                    <PaginationSmall pageNumber={pageNumber}
                                     setPageNumber={setPageNumber}
                                     pageCount={vacanciesPage?.meta?.pagination?.pageCount}
                    />
                </div>
                <div className={css.vacancies__filter}>
                    <h3 className={rootCss.default__title_24}>
                        {EN ? 'Filters' : 'Фільтри'}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export {VacanciesPage};
