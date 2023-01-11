import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import qs from 'qs';
import {Checkbox, FormControlLabel} from "@mui/material";

import {englishLevels, experiences} from '../../../pages/MentorPage/constants/mentor__constants'
import {getMentorsPaginatedConfirmed} from "../../../store/slices/mentors.slice";
import {ApprovedMentor} from "../ApprovedMentor/ApprovedMentor";
import cross from "../../../images/cross.svg";
import css from './ApprovedMentors.module.css';
import {getTechnologies} from "../../../store";
import {PaginationSmall} from '../../GeneralComponents';

const ApprovedMentors = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {
        isDeletedMentor, isConfirmedMentor, confirmedMentorPage,
    } = useSelector(state => state['mentorReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const [mentorPageNumber, setMentorPageNumber] = useState(1);
    const [technologyArray, setTechnologyArray] = useState([]);
    const [experienceArray, setExperienceArray] = useState([]);
    const [englishArray, setEnglishArray] = useState([]);

    useEffect(() => {
        dispatch(getTechnologies())
    }, [dispatch])

    useEffect(() => {
        let query = qs.stringify({
            filters: {
                englishLevel: {
                    $in: englishArray,
                }, experience: {
                    $in: experienceArray,
                },
                technologies: {
                    value: {
                        $in: technologyArray,
                    },
                },
            }
        }, {encodeValuesOnly: true});
        dispatch(getMentorsPaginatedConfirmed({query, mentorPageNumber}))
    }, [
        isDeletedMentor,
        isConfirmedMentor,
        mentorPageNumber,
        dispatch,
        englishArray.length,
        experienceArray.length,
        technologyArray.length
    ])

    const setEnglish = (event) => {
        if (event.target.checked) {
            return setEnglishArray([...englishArray, event.target.value]);
        }

        const index = englishArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...englishArray]
            const newArray = arr.filter(value => value !== event.target.value);
            return setEnglishArray(newArray);
        }
    }
    const setExperience = (event) => {
        if (event.target.checked) {
            return setExperienceArray([...experienceArray, event.target.value]);
        }

        const index = experienceArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...experienceArray]
            const newArray = arr.filter(value => value !== event.target.value);
            return setExperienceArray(newArray);
        }
    }
    const setTechnology = (event) => {
        if (event.target.checked) {
            return setTechnologyArray([...technologyArray, event.target.value]);
        }

        const index = technologyArray.findIndex(value => value === event.target.value);
        if (index >= 0) {
            let arr = [...technologyArray]
            const newArray = arr.filter(value => value !== event.target.value);
            return setTechnologyArray(newArray);
        }
    }

    return (<div className={css.confirmed__mentors__block}>
        <div className={css.confirmed__mentors}>
            <h2 className={css.admin__title}>
                {EN ? 'Mentors' : 'Ментори'}
            </h2>
            {confirmedMentorPage?.data && confirmedMentorPage.data.map(value => <ApprovedMentor key={value.id}
                                                                                                mentor={value}/>)}
            <div className={css.pagination__wrap}>
                <PaginationSmall pageNumber={mentorPageNumber}
                                 setPageNumber={setMentorPageNumber}
                                 pageCount={confirmedMentorPage.meta?.pagination?.pageCount}
                />
            </div>

        </div>
        <div className={css.filters}>
            <h2 className={css.admin__title}>
                {EN ? 'Filters' : 'Фільтри'}
            </h2>
            <div className={css.check__block}>
                <div className={css.check__block__form}>
                    <span className={css.check__block__span}>{EN ? "English level : " : "Рівень Англійської : "}</span>
                    {englishLevels.map(value =>
                        <FormControlLabel onChange={setEnglish}
                                          key={value.value}
                                          control={<Checkbox value={value.value} size={"small"}/>}
                                          label={<div className={css.label}>{value.value}</div>}/>)
                    }
                </div>
                <div className={css.check__block__form}>
                    <span className={css.check__block__span}>{EN ? "Experience : " : "Досвід : "}</span>
                    {experiences.map(value =>
                        <FormControlLabel onChange={setExperience}
                                          key={value.value}
                                          control={<Checkbox value={value.value} size={"small"}/>}
                                          label={<div className={css.label}>{value.value}</div>}/>)
                    }

                </div>
                <div className={css.check__block__form}>
                    <span className={css.check__block__span}>{EN ? "Technology :" : "Технологія :"}</span>
                    <div>
                        {technologies?.data?.map(technology =>
                            <FormControlLabel onChange={setTechnology}
                                              key={technology.id}
                                              control={<Checkbox value={technology.attributes.value} size={"small"}/>}
                                              label={<div
                                                  className={css.label}>{technology?.attributes?.value}</div>}/>)
                        }
                    </div>

                </div>
            </div>
        </div>


        <div className={css.filters__modal__block}>
            <div className={css.admin__title__modal} onClick={() => setModal(!modal)}>
                {modal ? <img src={cross} alt="cross"/> : <div>{EN ? 'Filters' : 'Фільтри'}</div>}
            </div>
            {
                modal &&
                <div className={css.filters__modal}>
                    <div className={css.check__block__modal}>
                        <div className={css.check__block__form}>
                            <span className={css.check__block__span}>{EN ? "English level : " : "Рівень Англійської : "}</span>
                            {englishLevels.map(value =>
                                <FormControlLabel onChange={setEnglish}
                                                  key={value.value}
                                                  control={<Checkbox value={value.value} size={"small"}/>}
                                                  label={<div className={css.label}>{value.value}</div>}/>)
                            }
                        </div>
                        <div className={css.check__block__form}>
                            <span className={css.check__block__span}>{EN ? "Experience : " : "Досвід : "}</span>
                            {experiences.map(value =>
                                <FormControlLabel onChange={setExperience}
                                                  key={value.value}
                                                  control={<Checkbox value={value.value} size={"small"}/>}
                                                  label={<div className={css.label}>{value.value}</div>}/>)
                            }

                        </div>
                        <div className={css.check__block__form}>
                            <span className={css.check__block__span}>{EN ? "Technology :" : "Технологія :"}</span>
                            <div>
                                {technologies?.data?.map(technology =>
                                    <FormControlLabel onChange={setTechnology}
                                                      key={technology.id}
                                                      control={<Checkbox value={technology.attributes.value} size={"small"}/>}
                                                      label={<div
                                                          className={css.label}>{technology?.attributes?.value}</div>}/>)
                                }
                            </div>

                        </div>
                    </div>

                </div>
            }
        </div>
    </div>);
};

export {ApprovedMentors};
