import React from 'react';
import {Helmet} from 'react-helmet-async';

import css from './MentorsPage.module.css';
import rootCSS from "../../styles/root.module.css";
import {ApprovedMentors} from "../../components";

const MentorsPage = () => {
    const title = 'Become a mentor';
    const description = 'Form for filling out an application to become a mentor';
    const url = 'https://skilliant.net/mentors';

    return (
        <div className={css.mentors__page}>
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

            <div className={rootCSS.root__background}></div>
            <div className={css.mentors__block__wrap}>
                <ApprovedMentors/>
            </div>
        </div>
    );
};

export {MentorsPage};
