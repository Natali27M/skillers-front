import React, {useEffect, useState} from 'react';

import css from './MentorDetails.module.css';
import rootCSS from "../../../styles/root.module.css";
import userCSS from "../../../pages/UserPage/UserPage.module.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {achievementsServices, userServices} from "../../../services";
import {resultsServices} from "../../../services/results.services";

import up from "../../../images/up.svg";
import cross from "../../../images/cross-red.svg";
import grey from "../../../images/check-grey.svg";
import green from "../../../images/check-green.svg";
import {deleteMentor, updateIsConfirmedMentor} from "../../../store/slices/mentors.slice";

const MentorDetails = ({mentor, setUserId, mentorId}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {roles} = useSelector(state => state['userReducers']);

    const {isDeletedMentor, isConfirmedMentor} = useSelector(state => state['mentorReducers']);
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);

    const [rating, setRating] = useState(0);

    const [result, setResult] = useState({});

    const [emailCopyTime, setEmailCopyTime] = useState(false);


    useEffect(() => {
        userServices.getUserById(Number(mentor?.userId)).then(value => setUser(value));
        achievementsServices.searchUserAchievement(Number(mentor?.userId)).then(value => {
            if (value?.attributes?.rating) {
                return setRating(value?.attributes?.rating)
            }
            return setRating(0)
        });
    }, [mentor.userId, isConfirmedMentor, isDeletedMentor]);


    useEffect(() => {
        resultsServices.getUserResult(mentor.userId, 1).then(value => setResult(value));
    }, [mentor.userId]);

    const emailCopy = () => {
        setEmailCopyTime(true);
        navigator.clipboard.writeText(mentor?.userEmail);
        setTimeout(() => {
            setEmailCopyTime(false);
        }, 1000);

    };

    let num = 1;
    const counter = () => {
        return num++;
    }

    const makeMentorDelete = (id) => {
        dispatch(deleteMentor(id))
    }

    const approve = (id, booleanValue) => {
        dispatch(updateIsConfirmedMentor({id, booleanValue}))
    }
    return (
        <>
            <div className={css.user__block}>
                <div className={css.roll__up} onClick={() => setUserId()}>
                    <img src={up} alt="cross"/>
                </div>

                <div className={rootCSS.default__title_24}>{mentor?.userName}</div>
                <div className={css.user__content}>
                    <div className={css.user__info_wrap}>
                        <div className={css.user__info_title}>{EN ? 'Information' : 'Інформація'}</div>
                        <a href={`mailto:${user?.email}`} className={css.user__info_block}>
                            <div className={css.user__info_field}>
                                Email:
                            </div>
                            <div className={css.user__info_element}>
                                {mentor?.userEmail}
                            </div>
                        </a>

                        <button className={css.email__btn} onClick={() => emailCopy()}>
                            {emailCopyTime ? (EN ? 'Copied!' : 'Скопійовано!') : (EN ? 'Copy email' : 'Скопіювати email')}
                        </button>

                        <div className={css.user__info_block}>
                            <div className={css.user__info_field}>
                                {EN ? 'Rating:' : 'Рейтинг:'}
                            </div>
                            <div className={css.user__info_element}>
                                {rating === 0 ? `${EN ? "Not any rating" : "Немає рейтигу"}` : rating}
                            </div>
                        </div>
                        <div className={css.user__info_block}>
                            <div className={css.user__info_field}>
                                {EN ? 'Search:' : 'У пошуку:'}
                            </div>
                            <div className={css.user__info_element}>
                                {user?.openForHiring ? (EN ? 'Yes' : 'Так') : (EN ? 'No' : 'Ні')}
                            </div>
                        </div>
                        <div className={css.user__info_block}>
                            <div className={css.user__info_field}>
                                {EN ? 'Experience:' : 'Досвід:'}
                            </div>
                            <div className={css.user__info_element}>
                                {mentor?.experience}
                            </div>
                        </div>
                        <div className={css.user__info_block}>
                            <div className={css.user__info_field}>
                                {EN ? 'English Level:' : 'Рівень англійської:'}
                            </div>
                            <div className={css.user__info_element}>
                                {mentor.englishLevel}
                            </div>
                        </div>
                        <div className={css.user__info_block}>
                            <div className={css.user__info_field}>
                                {EN ? 'Is confirmed:' : 'Підтверджений:'}
                            </div>
                            <div className={css.user__info_element}>
                                {mentor.isConfirmedMentor ? (EN ? "yes" : "Так") : (EN ? "Is not" : "Ні")}
                            </div>
                        </div>
                        <div className={css.user__info_block}>
                            <div className={css.user__info_field}>
                                Linkedin
                            </div>
                            <div className={css.user__info_element}>
                                {
                                    user?.linkedin ?
                                        <a href={user?.linkedin} target="_blank" className={userCSS.linked__btn}>
                                            LinkedIn
                                        </a> :
                                        <a href={mentor?.linkedin} target="_blank" className={userCSS.linked__btn}>
                                            LinkedIn
                                        </a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={css.user__results_wrap}>
                        <div className={css.user__info_title}>{EN ? 'Tests results' : 'Результати тестів'}</div>
                        {
                            result?.data?.length ?
                                <div className={css.results__content}>
                                    <div className={css.result__header}>
                                        <div className={css.result__test}>
                                            {EN ? 'Test' : 'Тест'}
                                        </div>
                                        <div className={css.result__number}>
                                            {EN ? 'Result' : 'Результат'}
                                        </div>
                                    </div>
                                    {result?.data?.map(result =>
                                        <Link to={`/test/${result?.attributes?.testId}-${result?.attributes?.userId}`}
                                              key={result?.id} className={css.result__block}>
                                            <div className={css.result__test}>
                                                {result?.attributes?.testName}
                                            </div>
                                            <div className={css.result__number}>
                                                {result.attributes.correctAnswer}/{result.attributes.allExercises}
                                            </div>
                                        </Link>
                                    )
                                    }
                                </div> :
                                <div className={css.result__header}>
                                    {EN ? "No tests results" : "Нема результатів тестів"}
                                </div>
                        }
                    </div>
                    <div className={css.user__results_wrap}>
                        <div className={css.user__info_title}>{EN ? 'Technologies' : 'Технології'}</div>
                        {
                            mentor?.technologies?.data?.length ?
                                <div className={css.results__content}>
                                    <div className={css.result__header}>
                                        <div className={css.result__test}>
                                            <span>№</span>
                                        </div>
                                        <div className={css.result__number}>
                                            {EN ? 'Name' : 'Назава'}
                                        </div>
                                    </div>
                                    {mentor?.technologies?.data?.map(result =>
                                        <div className={css.result__block} key={result.id}>
                                            <div className={css.result__test}>
                                                {counter()}
                                            </div>
                                            <div className={css.result__number}>
                                                {result.attributes.label}
                                            </div>
                                        </div>
                                    )
                                    }
                                </div> :
                                <div className={css.result__header}>
                                    {EN ? "There are no selected technologies" : "Немає обраних технологій"}
                                </div>
                        }
                    </div>
                    <div className={css.user__results_wrap}>
                        <div className={css.user__info_title}>{EN ? 'Cover letter' : 'Супроводжуючий лист'}</div>
                        <div className={css.cover__letter}>{mentor.coverLetter}</div>
                    </div>

                    {
                        roles?.length && roles[0] === "admin" && <div className={css.mentor__delete__approve__block}>
                            <div onClick={() => makeMentorDelete(mentorId)}>
                                <img src={cross} alt="cross" className={css.delete__mentor}/>
                            </div>

                            <div>
                                {
                                    mentor.isConfirmedMentor ?
                                        <img src={grey} alt="grey" className={css.unApprove__mentor}
                                             onClick={() => approve(mentorId, false)}/> :
                                        <img src={green} alt="green" className={css.approve__mentor}
                                             onClick={() => approve(mentorId, true)}/>
                                }
                            </div>
                        </div>
                    }
                </div>

            </div>

        </>
    );
};

export {MentorDetails};
