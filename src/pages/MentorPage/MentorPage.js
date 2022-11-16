import React, {useState} from 'react';
import Select from 'react-select'
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import css from './MentorPage.module.css';
import rootCSS from '../../styles/root.module.css'
import {englishLevels, experiences, technologies} from "./constants/mentor__constants";
import {MentorValidator} from "../../validation/mentor.validator";
import cross from '../../images/cross.svg';

const MentorPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    let {user} = useSelector(state => state['userReducers']);


    const {handleSubmit, register, reset} = useForm({resolver: joiResolver(MentorValidator)});

    const [technology, setTechnology] = useState([]);
    const [englishLevel, setEnglishLevel] = useState({value: "Not selected"});
    const [experience, setExperience] = useState({value: "Not selected"});
    const [modalOpen, setModalOpen] = useState(false);

    if (!user) {
        user = JSON.parse(localStorage.getItem('user'))
    }

    const sendMentorData = (data) => {
        const mentorData = {
            ...data,
            userId: user.id,
            userEmail: user.email,
            technology: technology,
            experience: experience.value,
            englishLevel: englishLevel.value,
        }
        console.log(mentorData);
        reset();

        setModalOpen(true);
        setTimeout(() => {
            setModalOpen(false);
        }, 4000);
    }

    return (
        <div className={css.mentor__page}>
            <div className={css.mentor__page__bg}></div>
            <div className={css.mentor__form__wrap}>
                <h2>{EN ? `Congratulations ${user.username}, to become a mentor, fill in the fields according to your skills` :
                    `Вітаємо ${user.username}, щоб стати ментором заповніть поля про свої навички`}</h2>

                <div className={css.mentor__form__block}>
                    <form className={css.mentor__form} onSubmit={handleSubmit(sendMentorData)}>
                        <div className={css.mentor__select__block}>
                            <span>{EN ? "Input the name" : "Ваше ім'я"}</span>
                            <input
                                type="text"
                                placeholder={EN ? 'Name' : 'Ім\'я'}
                                className={css.mentor__input}
                                {...register('userName')}
                            />
                        </div>

                        <div className={css.mentor__select__block}>
                            <span>{EN ? "Select a technology" : "Виберіть технологію"}</span>
                            <Select options={technologies} onChange={setTechnology}
                                    isMulti
                                    placeholder={EN ? "Technology" : "Виберіть технологію"}
                                    className={css.mentor__select__input}/>
                        </div>

                        <div className={css.mentor__select__block}>
                            <span>{EN ? "Experience" : "Виберіть досвід роботи"}</span>
                            <Select options={experiences} onChange={setExperience}
                                    placeholder={EN ? "Experience" : "Досвід роботи"}
                                    className={css.mentor__select__input}/>
                        </div>

                        <div className={css.mentor__select__block}>
                            <span>{EN ? "English level" : "Виберіть рівень англійської"}</span>
                            <Select options={englishLevels} onChange={setEnglishLevel}
                                    placeholder={EN ? "English level" : "Рівень англійської"}
                                    className={css.mentor__select__input}/>
                        </div>

                        <div className={css.mentor__select__block}>
                            <span>{EN ? "Linkedin profile" : "Профіль на Linkedin"}</span>
                            <input
                                type="text"
                                placeholder={EN ? 'Linkedin profile' : 'Профіль на Linkedin'}
                                className={css.mentor__input}
                                {...register('linkedin')}
                            />
                        </div>

                        <div className={css.mentor__cover_letter__block}>
                            <span>{EN ? "Cover Letter" : "Супровідний лист"}</span>
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
