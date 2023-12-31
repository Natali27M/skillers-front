import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Checkbox, FormControlLabel} from '@mui/material';
import qs from 'qs';

import css from './VacanciesPage.module.css';
import mentorsCss from '../../components/ForMentorsPage/ApprovedMentors/ApprovedMentors.module.css';
import rootCss from '../../styles/root.module.css';
import {getVacanciesPaginated} from '../../store';
import {PaginationSmall, VacancyBlock} from '../../components';
import {englishLevels, experiences} from './constants/vacancies__constants';
import {getTechnologies} from '../../store';
import vacanciesExperienceDisplay from '../../RootFunctions/vacanciesExperienceDisplay';
import cross from '../../images/cross.svg';
import filter from '../../images/vacancy/filter.svg';

const VacanciesPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {technologies} = useSelector(state => state['technologiesReducers']);

    const {vacanciesPage} = useSelector(state => state['vacancyReducers']);

    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [technologyArray, setTechnologyArray] = useState([]);
    const [experienceArray, setExperienceArray] = useState([]);
    const [englishArray, setEnglishArray] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getTechnologies());
    }, [dispatch]);

    useEffect(() => {
        let query = qs.stringify({
            filters: {
                englishLevel: {
                    $in: englishArray,
                },
                experience: {
                    $in: experienceArray,
                },
                technologies: {
                    value: {
                        $in: technologyArray,
                    },
                },
            }
        }, {encodeValuesOnly: true});
        dispatch(getVacanciesPaginated({query, pageNumber}));
    }, [
        dispatch,
        englishArray.length,
        experienceArray.length,
        technologyArray.length,
        pageNumber
    ]);


    const setEnglish = (event) => {
        if (event.target.checked) {
            return setEnglishArray([...englishArray, event.target.value]);
        }

        const index = englishArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...englishArray];
            const newArray = arr.filter(value => value !== event.target.value);
            return setEnglishArray(newArray);
        }
    };
    const setExperience = (event) => {
        if (event.target.checked) {
            return setExperienceArray([...experienceArray, event.target.value]);
        }

        const index = experienceArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...experienceArray];
            const newArray = arr.filter(value => value !== event.target.value);
            return setExperienceArray(newArray);
        }
    };
    const setTechnology = (event) => {
        if (event.target.checked) {
            return setTechnologyArray([...technologyArray, event.target.value]);
        }

        const index = technologyArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...technologyArray];
            const newArray = arr.filter(value => value !== event.target.value);
            return setTechnologyArray(newArray);
        }
    };


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
            <div className={css.vacancies__main}>
                <div className={css.create__vacancies}>
                    <div className={css.create__vacancies_btn} onClick={() => navigate('/employer')}>
                        {EN ? 'Create vacancies' : 'Створити вакансію'}
                    </div>
                </div>

                <div className={css.vacancies__wrap}>
                <div className={css.result__vacancies}>
                    <h3 className={rootCss.default__title_24}>
                        {EN ? 'Vacancies' : 'Вакансії'}
                    </h3>
                    {vacanciesPage?.data?.length ? vacanciesPage?.data?.map(vacancy =>
                            <VacancyBlock vacancy={vacancy.attributes} id={vacancy?.id}
                                          key={vacancy?.id}/>
                        ) :
                        <div>{EN ? 'There are no vacancies with these criteria' : 'Немає вакансій з такими критеріями'}</div>}
                    {!!vacanciesPage?.data?.length &&
                        <PaginationSmall pageNumber={pageNumber}
                                         setPageNumber={setPageNumber}
                                         pageCount={vacanciesPage?.meta?.pagination?.pageCount}
                        />}
                </div>
                <img onClick={() => setModalOpen(!modalOpen)} className={css.filter__btn} src={filter} alt="filter"/>
                <div className={`${css.vacancies__filter} ${modalOpen && css.active__modal}`}>
                    <h3 className={rootCss.default__title_24}>
                        {EN ? 'Filters' : 'Фільтри'}
                    </h3>
                    <img onClick={() => setModalOpen(!modalOpen)} className={css.filter__btn_close} src={cross}
                         alt="cross"/>
                    <div className={`${mentorsCss.check__block} ${css.check__block_adaptive}`}>
                        <div className={mentorsCss.check__block__form}>
                            <span
                                className={mentorsCss.check__block__span}>{EN ? 'Technology :' : 'Технологія :'}</span>
                            <div>
                                {technologies?.data?.map(technology =>
                                    <FormControlLabel onChange={setTechnology}
                                                      key={technology.id}
                                                      control={<Checkbox value={technology.attributes.value}
                                                                         size={'small'}/>}
                                                      label={<div
                                                          className={mentorsCss.label}>{technology?.attributes?.value}</div>}/>)
                                }
                            </div>

                        </div>
                        <div className={mentorsCss.check__block__form}>
                            <span className={mentorsCss.check__block__span}>{EN ? 'Experience : ' : 'Досвід : '}</span>
                            {experiences.map(value =>
                                <FormControlLabel onChange={setExperience}
                                                  key={value.value}
                                                  control={<Checkbox value={value.label} size={'small'}/>}
                                                  label={<div
                                                      className={mentorsCss.label}>{vacanciesExperienceDisplay(value.label, EN)}</div>}/>)
                            }

                        </div>
                        <div className={mentorsCss.check__block__form}>
                            <span
                                className={mentorsCss.check__block__span}>{EN ? 'English level : ' : 'Рівень Англійської : '}</span>
                            {englishLevels.map(value =>
                                <FormControlLabel onChange={setEnglish}
                                                  key={value.value}
                                                  control={<Checkbox value={value.value} size={'small'}/>}
                                                  label={<div className={mentorsCss.label}>{value.value}</div>}/>)
                            }
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
};

export {VacanciesPage};
