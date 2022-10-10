import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Navigate, useLocation} from 'react-router-dom';

import css from './UserPage.module.css';
import rootCSS from '../../styles/root.module.css'
import avatar from '../../images/avatar.jpg';
import arrow from '../../images/arrow.svg';
import Lamer from '../../images/rank_little/Lamer.png';
import Trainee from '../../images/rank_little/Trainee.png';
import Junior from '../../images/rank_little/Junior.png';
import Middle from '../../images/rank_little/Middle.png';
import Senior from '../../images/rank_little/Senior.png';

import {getUserResults, getUserRoles, logout, updateUser} from '../../store';

import {getUserAchievement} from '../../store/slices/achievments.slice';
import {useForm} from 'react-hook-form';
import {getTestsForApprove} from '../../store/slices/testPage.slice';

const UserPage = () => {
    const {register, handleSubmit} = useForm();

    const {EN} = useSelector(state => state['languageReducers']);

    const {user, roles, updateError} = useSelector(state => state['userReducers']);

    const {userResults} = useSelector(state => state['resultReducers']);

    const {userAchievement, userRank} = useSelector(state => state['achievementsReducers']);

    const {testsForApprove} = useSelector(state => state['testsReducers']);

    const {pathname} = useLocation();

    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getUserAchievement(id));
            dispatch(getUserRoles(id));
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getUserResults({userId: id, pageNum: pageNumber}));
        }
    }, [user, pageNumber]);

    useEffect(() => {
        dispatch(getTestsForApprove(1));
    }, [pathname]);

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

    const updateUserFunction = (obj) => {
        dispatch(updateUser({data: {username: obj.user}, userId: user.id}));
    };

    return (
        <div className={css.user__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.user__wrap}>
                <img src={avatar} className={css.user__avatar} alt={user.username}/>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Information' : 'Інформація'}
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Username' : 'Нікнейм'}</div>
                    <div className={css.user__db_content}>{user.username}</div>
                </div>
                <form className={css.update__username_form} onSubmit={handleSubmit(updateUserFunction)}>
                    <input
                        type="text"
                        placeholder={EN ? 'Change username' : 'Змінити нікнейм'}
                        {...register('user')}
                        autoComplete="off"
                        defaultValue={''}
                        className={css.update__username__input}
                    />
                    <button className={css.update__username__button}>{EN ? 'Save' : 'Зберегти'}</button>
                </form>
                {updateError &&
                    <div className={css.error}>
                        {EN ? 'Username change error. Perhaps a User with such a nickname already exists.'
                            :
                            'Помилка зміни юзернейму. Можливо Користувач з таким нікнеймом вже існує.'}
                    </div>
                }

                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Email' : 'Email'}</div>
                    <div className={css.user__db_content}>{user.email}</div>
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Rating' : 'Рейтинг'}</div>
                    <div className={css.user__db_content}>{userAchievement?.attributes?.rating || 0}</div>
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Rank' : 'Звання'}</div>
                    <div className={css.user__db_content}>
                        <Link to={'/rank'}>
                            <img
                                src={userRank === 'Lamer' ? Lamer : userRank === 'Trainee' ? Trainee
                                    :
                                    userRank === 'Junior' ? Junior : userRank === 'Middle' ? Middle : Senior}
                                alt="trainee"
                                className={css.user__rank_img}
                            />
                        </Link>
                        {userRank || '-'}
                    </div>
                </div>
                {!!userResults?.data?.length && <div className={css.results__wrap}>
                    <div className={rootCSS.default__title_24}>
                        {EN ? 'My results' : 'Мої досягнення'}
                    </div>
                    <div className={css.results__header}>
                        <div className={css.result__testName}>{EN ? 'Test' : 'Тест'}</div>
                        <div className={css.results__result}>{EN ? 'Result' : 'Результат'}</div>
                    </div>
                    {userResults?.data?.map(result =>
                        <div key={result.id} className={css.results__block}>
                            <div className={css.result__testName}>{result.attributes.testName}</div>
                            <div
                                className={css.results__result}>{result.attributes.correctAnswer}/{result.attributes.allExercises}</div>
                        </div>
                    )}
                    <div className={css.pagination__title}>{EN ? 'Page' : 'Сторінка'}</div>
                    <div className={css.pagination__block}>
                        <img className={css.arrow__left} onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                             src={arrow} alt="arrow"/>
                        <div>{pageNumber}/{userResults.meta.pagination.pageCount}</div>
                        <img className={css.arrow__right} src={arrow}
                             onClick={() => pageNumber < userResults.meta?.pagination?.pageCount && setPageNumber(pageNumber + 1)}
                             alt="arrow"/>
                    </div>
                </div>}
                <div className={css.buttons__wrap}>
                    <Link to={'/'} className={rootCSS.default__button}>{EN ? 'To main' : 'На головну'}</Link>
                    <Link to={'/createTest'} className={rootCSS.default__button}>{EN ? 'Create test' : 'Створити тест'}</Link>
                    <div className={rootCSS.default__button} onClick={() => dispatch(logout())}>{EN ? 'Logout' : 'Вихід'}</div>
                    {roles?.includes('admin') &&
                        <Link to={'/admin'} className={rootCSS.default__button}>
                            {EN ? 'Admin panel' : 'Адмін панель'}
                            {!!testsForApprove?.length && <div className={css.approve__time}>!</div>}
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export {UserPage};