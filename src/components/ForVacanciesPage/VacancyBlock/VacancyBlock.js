import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import experience from '../../../images/vacancy/experience.svg';
import english from '../../../images/vacancy/english.svg';
import calendar from '../../../images/vacancy/calendar.svg';
import people from '../../../images/vacancy/people.svg';

import css from './VacancyBlock.module.css';
import vacancyTimeDisplay from '../../../RootFunctions/vacancyTimeDisplay';
import vacanciesExperienceDisplay from '../../../RootFunctions/vacanciesExperienceDisplay';
import vacanciesReviewDisplay from '../../../RootFunctions/vacanciesReviewDisplay';
import {TechBlock} from '../TechBlock/TechBlock';

const VacancyBlock = ({vacancy, id}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <Link to={`/vacancy/${id}`} className={css.vacancy__block}>
            <div className={css.vacancy__header}>
                <h4 className={css.vacancy__title}>
                    {vacancy?.title}
                </h4>
                <h6 className={css.vacancy__salary}>
                    {vacancy?.salary} $
                </h6>
            </div>
            <p className={css.vacancy__description}>
                {vacancy?.subtitle}
            </p>
            <div className={css.tech__wrap}>
                {vacancy?.technologies?.data?.map(technology =>
                    <TechBlock technology={technology.attributes}
                               key={technology?.id}/>
                )}
            </div>
            <div className={css.vacancy__footer}>
                <div className={css.vacancy__footer_block}>
                    <img src={experience} alt="experience"/>
                    <h6>{vacanciesExperienceDisplay(vacancy?.experience, EN)}</h6>
                </div>
                <div className={css.vacancy__footer_block}>
                    <img src={english} alt="english"/>
                    <h6>{vacancy?.englishLevel}</h6>
                </div>
                <div className={css.vacancy__footer_block}>
                    <img src={calendar} alt="calendar"/>
                    <h6>{vacancyTimeDisplay(vacancy?.createdAt, EN)}</h6>
                </div>
                <div className={css.vacancy__footer_block}>
                    <img src={people} alt="people"/>
                    <h6>{vacanciesReviewDisplay(vacancy?.reviews, EN)}</h6>
                </div>
            </div>
        </Link>
    );
};

export {VacancyBlock};
