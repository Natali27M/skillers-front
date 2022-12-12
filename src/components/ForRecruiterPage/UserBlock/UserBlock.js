import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './UserBlock.module.css';
import rootCSS from '../../../styles/root.module.css';
import userCSS from '../../../pages/UserPage/UserPage.module.css';
import {achievementsServices, userServices} from '../../../services';
import {resultsServices} from '../../../services/results.services';
import arrow from '../../../images/arrow.svg';
import cross from '../../../images/cross.svg';

const UserBlock = ({userId, setUserId}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [user, setUser] = useState(null);

    const [rating, setRating] = useState(0);

    const [pageNumber, setPageNumber] = useState(1);

    const [result, setResult] = useState({});
    const [emailCopyTime, setEmailCopyTime] = useState(false);

    const [linkedName, setLinkedName] = useState('');

    const [informationModal, setInformationModal] = useState('');

    useEffect(() => {
        userServices.getUserById(userId).then(value => setUser(value));
        achievementsServices.searchUserAchievement(userId).then(value => setRating(value?.attributes?.rating));
        setPageNumber(1);
    }, [userId]);

    useEffect(() => {
        if (user?.linkedin) {
            const result = [];
            const nameWithNumber = user?.linkedin.split('/')[4];
            nameWithNumber.split('-').slice(0, 2).forEach(element => {
                let array = element.split('');
                array[0] = array[0].toUpperCase();
                result.push(array.join(''));
            });
            setLinkedName(result.join(' '));
        }
    }, [user]);

    useEffect(() => {
        resultsServices.getUserResult(userId, pageNumber).then(value => setResult(value));
    }, [userId, pageNumber]);

    const emailCopy = () => {
        setEmailCopyTime(true);
        navigator.clipboard.writeText(user?.email);
        setTimeout(() => {
            setEmailCopyTime(false);
        }, 1000);

    };

    return (
        <div className={css.user__block_wrap}>
            <div className={css.user__block}>
                <img className={css.cross__btn} onClick={() => setUserId(null)} src={cross}
                     alt="cross"/>
                <div className={rootCSS.default__title_24}>{user?.username}</div>
                <div className={css.user__content}>
                    <div className={css.user__info_wrap}>
                        <div className={css.user__info_title}>{EN ? 'Information' : 'Інформація'}</div>
                        <a href={`mailto:${user?.email}`} className={css.user__info_block_email}>
                            <div className={css.user__info_field}>
                                Email:
                            </div>
                            <div className={css.user__info_element}>
                                {user?.email}
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
                                {rating}
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
                                Linkedin
                            </div>
                            <div className={css.user__info_element}>
                                {user?.linkedin ?
                                    <a href={user?.linkedin} target="_blank" className={css.user__info_linked_btn}>
                                        {linkedName}
                                    </a> : (EN ? 'none' : 'немає')
                                }
                            </div>
                        </div>
                    </div>
                    <div className={css.user__results_wrap}>
                        <div className={css.user__info_title}>{EN ? 'Results' : 'Результати'}</div>
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
                            )}
                        </div>
                        <div className={css.pagination__block}>
                            <img className={css.arrow__left}
                                 onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                                 src={arrow} alt="arrow"/>
                            <div>{pageNumber}/{result?.meta?.pagination?.pageCount}</div>
                            <img className={css.arrow__right} src={arrow}
                                 onClick={() => pageNumber < result?.meta?.pagination?.pageCount && setPageNumber(pageNumber + 1)}
                                 alt="arrow"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export {UserBlock};
