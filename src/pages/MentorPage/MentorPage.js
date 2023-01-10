import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {Helmet} from 'react-helmet-async';

import css from './MentorPage.module.css';
import rootCSS from '../../styles/root.module.css'
import {englishLevels, experiences} from "./constants/mentor__constants";
import {MentorValidator} from "../../validation/mentor.validator";
import cross from '../../images/cross.svg';
import {getTechnologies} from "../../store";
import {createMentor} from "../../store/slices/mentors.slice";

const MentorPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    let {user} = useSelector(state => state['userReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);
    const dispatch = useDispatch();


    const {handleSubmit, register, reset} = useForm({resolver: joiResolver(MentorValidator)});

    const [technology, setTechnology] = useState([]);
    const [englishLevel, setEnglishLevel] = useState({value: "Not selected"});
    const [experience, setExperience] = useState({value: "Not selected"});
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getTechnologies())
    }, [])

    if (!user) {
        user = JSON.parse(localStorage.getItem('user'))
    }

    const sendMentorData = (data) => {
        const mentorData = {
            ...data,
            userId: user.id,
            userEmail: user.email,
            experience: experience.value,
            englishLevel: englishLevel.value,
            technologies: technology
        }
        dispatch(createMentor(mentorData));
        reset();

        setModalOpen(true);
        setTimeout(() => {
            setModalOpen(false);
        }, 4000);
    }

    const technologiesArray = (array) => {
        let mentorTechnologies = []
        for (const element of array) {
            const find = technologies.data.find(value => value.attributes.value === element.value);
            mentorTechnologies.push(find)
        }
        setTechnology(mentorTechnologies)
    }

    const title = 'Become a mentor';
    const description = 'Form for filling out an application to become a mentor';
    const url = 'https://skilliant.net/mentor';

    return (
        <div className={css.mentor__page}>
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

            <div className={css.mentor__page__bg}></div>
            <div className={css.mentor__form__wrap}>
                <div
                    className={css.mentor__congratulations}>{EN ? `Congratulations ${user.username}, to become a mentor, fill out all the fields of the form !` :
                    `Вітаємо ${user.username}, щоб стати ментором заповніть поля форми`}
                </div>

                <div className={css.mentor__form__block}>
                    <form className={css.mentor__form} onSubmit={handleSubmit(sendMentorData)}>
                        <div className={css.mentor__select__block}>
                            <span className={css.mentor__select__span}><div className={css.required}>*</div>
                                {EN ? "Input the name : " : "Ваше ім'я : "}</span>
                            <input
                                type="text"
                                placeholder={EN ? 'Name' : 'Ім\'я'}
                                className={css.mentor__input}
                                {...register('userName')}
                            />
                        </div>

                        <div className={css.mentor__select__block}>
                            <span
                                className={css.mentor__select__span}><div className={css.required}>*</div>
                                {EN ? "Select a technology : " : "Виберіть технологію : "}</span>
                            <Select options={technologies?.data?.map(value => value.attributes)}
                                    onChange={technologiesArray}
                                    isMulti
                                    placeholder={EN ? "Technology" : "Виберіть технологію"}
                                    className={css.mentor__select__input}/>
                        </div>

                        <div className={css.mentor__select__block}>
                            <span
                                className={css.mentor__select__span}><div className={css.required}>*</div>
                                {EN ? "Experience : " : "Виберіть досвід роботи : "}</span>
                            <Select options={experiences} onChange={setExperience}
                                    placeholder={EN ? "Experience" : "Досвід роботи"}
                                    className={css.mentor__select__input}/>
                        </div>

                        <div className={css.mentor__select__block}>
                            <span
                                className={css.mentor__select__span}><div className={css.required}>*</div>
                                {EN ? "English level : " : "Виберіть рівень англійської : "}</span>
                            <Select options={englishLevels} onChange={setEnglishLevel}
                                    placeholder={EN ? "English level" : "Рівень англійської"}
                                    className={css.mentor__select__input}/>
                        </div>

                        <div className={css.mentor__select__block}>
                            <span
                                className={css.mentor__select__span}><div className={css.required}>*</div>
                                {EN ? "Linkedin profile : " : "Профіль на Linkedin : "}</span>
                            <input
                                type="text"
                                placeholder={EN ? 'Linkedin profile' : 'Профіль на Linkedin'}
                                className={css.mentor__input}
                                {...register('linkedin')}
                            />
                        </div>

                        <div className={css.mentor__cover_letter__block}>
                            <span
                                className={css.mentor__select__span}>{EN ? "Cover Letter : " : "Супровідний лист : "}</span>
                            <textarea
                                className={css.mentor__cover_letter}
                                placeholder={EN ? 'Cover Letter' : 'Супровідний лист'}
                                {...register('coverLetter')}
                            />
                        </div>
                        <button className={rootCSS.default__button}>
                            {EN ? 'Send' : 'Надіслати Заявку'}
                        </button>
                    </form>
                </div>


                <div className={modalOpen ? css.mentor__modal_open : css.mentor__modal}>
                    {EN ? 'Your application has been processed, please wait for a response' :
                        'Ваша заявка оформлена, очікуйте зворотнього зв\'язку'}
                    <img className={css.modal__cross} src={cross} alt="cross" onClick={() => setModalOpen(false)}/>
                </div>
            </div>
        </div>
    );
};

export {MentorPage};
