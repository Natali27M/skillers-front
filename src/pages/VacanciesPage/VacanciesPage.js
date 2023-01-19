import React from 'react';
import {Helmet} from 'react-helmet-async';
import css from './VacanciesPage.module.css';
import rootCss from '../../styles/root.module.css';

const VacanciesPage = () => {


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

            </div>
        </div>
    );
};

export {VacanciesPage};
