import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import qs from 'qs';
import {Checkbox, FormControlLabel} from "@mui/material";

import {englishLevels, experiences, technologies} from '../../../pages/MentorPage/constants/mentor__constants'
import {getMentorsPaginatedConfirmed} from "../../../store/slices/mentors.slice";
import {ApprovedMentor} from "../ApprovedMentor/ApprovedMentor";
import arrow from "../../../images/arrow.svg";
import css from './ApprovedMentors.module.css';

const ApprovedMentors = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {
        isDeletedMentor, isConfirmedMentor, confirmedMentorPage,
    } = useSelector(state => state['mentorReducers']);
    const dispatch = useDispatch();

    const [mentorPageNumber, setMentorPageNumber] = useState(1);
    const [technologyArray, setTechnologyArray] = useState([]);
    const [experienceArray, setExperienceArray] = useState([]);
    const [englishArray, setEnglishArray] = useState([]);

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
            <div className={css.admin__title}>
                {EN ? 'Mentors' : 'Ментори'}
            </div>

            <div className={css.mentors__header}>
                <div className={css.mentor__name__column}>
                    {EN ? 'Mentor' : 'Ментор'}
                </div>
                <div className={css.mentor__technologies__column}>
                    {EN ? "Technologies" : 'К-ть технологій'}
                </div>
                <div className={css.mentor__tests__column}>
                    {EN ? "Tests" : 'Тести'}
                </div>
                <div className={css.mentor__status__column}>
                    {EN ? 'Confirmed' : 'Підтверджений'}
                </div>
                <div className={css.mentor__experience__column}>
                    {EN ? 'Experience' : 'Досвід'}
                </div>
            </div>
            {confirmedMentorPage?.data && confirmedMentorPage.data.map(value => <ApprovedMentor key={value.id}
                                                                                                mentor={value}/>)}

            <div className={css.pagination__wrap}>
                <div className={css.pagination__block}>
                    <img src={arrow} alt="arrow" className={css.arrow__left}
                         onClick={() => mentorPageNumber > 1 && setMentorPageNumber(mentorPageNumber - 1)}/>
                    <div>{mentorPageNumber} / {confirmedMentorPage?.meta?.pagination?.pageCount}</div>
                    <img src={arrow} alt="arrow" className={css.arrow__right}
                         onClick={() => mentorPageNumber < confirmedMentorPage.meta?.pagination?.pageCount && setMentorPageNumber(mentorPageNumber + 1)}/>
                </div>
            </div>
        </div>
        <div className={css.filters}>
            <div className={css.admin__title}>
                {EN ? 'Filters' : 'Фільтри'}
            </div>
            <div className={css.check__block}>
                <div>
                    <span>{EN ? "English level" : "Рівень Англійської"}</span>
                    {englishLevels.map(value =>
                        <FormControlLabel onChange={setEnglish}
                                          key={value.value}
                                          control={<Checkbox value={value.value}/>}
                                          label={value.value}/>)
                    }
                </div>
                <div>
                    <span>{EN ? "Experience" : "Досвід"}</span>
                    {experiences.map(value =>
                        <FormControlLabel onChange={setExperience}
                                          key={value.value}
                                          control={<Checkbox value={value.value}/>}
                                          label={value.value}/>)
                    }

                </div>
                <div>
                    <span>{EN ? "Technology" : "Технологія"}</span>
                    {technologies.map(value =>
                        <FormControlLabel onChange={setTechnology}
                                          key={value.value}
                                          control={<Checkbox value={value.value}/>}
                                          label={value.value}/>)
                    }

                </div>
            </div>
        </div>
    </div>);
};

export {ApprovedMentors};
