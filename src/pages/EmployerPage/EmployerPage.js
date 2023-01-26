import React, {useEffect, useState} from 'react';

import css from './EmployerPage.module.css';

import rootCss from '../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getVacanciesByEmployer} from '../../store/slices/vacancy.slice';
import {PaginationSmall, VacancyBlock} from '../../components';
import {Helmet} from 'react-helmet-async';

const EmployerPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const {vacanciesByEmployerPage, status} = useSelector(state => state['vacancyReducers']);

    useEffect(() => {
        console.log(vacanciesByEmployerPage);
    }, [vacanciesByEmployerPage]);

    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (user) dispatch(getVacanciesByEmployer({employerId: user?.id, pageNum: pageNumber}));
    }, [user]);

    const title = 'For employer';
    const description = 'Get acquainted with the list of vacancies and choose the one that suits you';
    const url = `https://skilliant.net/employer`;

    return (
        <div className={css.employer__page}>
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
            <div className={css.employer__wrap}>
                <div className={css.employer__header}>
                    <h2 className={css.employer__title}>
                        {(!vacanciesByEmployerPage?.data?.length && status === 'fulfilled')
                            ?
                            (EN ? 'You have no vacancies created' : 'У вас немає створених вакансій')
                            :
                            (EN ? 'Your vacancies' : 'Ваші вакансії')
                        }
                    </h2>
                </div>
                {vacanciesByEmployerPage?.data?.map(vacancy =>
                    <VacancyBlock vacancy={vacancy.attributes} id={vacancy?.id}
                                  key={vacancy?.id}/>
                )}
                {!!vacanciesByEmployerPage?.data?.length &&
                    <PaginationSmall pageNumber={pageNumber}
                                     setPageNumber={setPageNumber}
                                     pageCount={vacanciesByEmployerPage?.meta?.pagination?.pageCount}
                    />}
            </div>
        </div>
    );
};

export {EmployerPage};
