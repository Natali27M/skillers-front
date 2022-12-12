import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import css from './RecruiterPage.module.css';
import rootCSS from '../../styles/root.module.css';
import {getLeaderBordTen, getLeaderBordByQueryTen} from '../../store/slices/achievments.slice';
import {UserBlock, Pagination} from '../../components';
import pagination from '../../RootFunctions/pagination';

const RecruiterPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {roles} = useSelector(state => state['userReducers']);

    const {leaderBordTen} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);

    const [isQuery, setIsQuery] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [data, setData] = useState();

    useEffect(() => {
        if (isQuery === false) {
            dispatch(getLeaderBordTen(currentPage));
        }
    }, [currentPage, isQuery]);

    useEffect(() => {
        if (isQuery === true) {
            dispatch(getLeaderBordByQueryTen({query: data, currentPage}));
        }
    }, [currentPage, isQuery, data]);

    const allPages = leaderBordTen?.meta?.pagination?.pageCount;

    const pagesArray = pagination(allPages, currentPage);

    const handleChange = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setData(e.target.value);
        if (e.target.value === '') {
            setIsQuery(false);
        } else {
            setIsQuery(true);
        }
    };


    if (!(roles?.includes('admin'))) {
        return <Navigate to={'/user'} replace/>;
    }

    return (
        <div className={css.recruiter__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.recruiter__wrap}>
                <div className={css.user__search_wrap} onClick={() => setUserId(null)}>
                    <form className={css.user__search_form} onSubmit={e => e.preventDefault()}>
                        <input onChange={e => handleChange(e)} className={css.user__search_input} type="text"
                               placeholder={EN ? 'Search users' : 'Знайти користувачів'}/>
                    </form>
                </div>

                <div className={css.users__wrap}>
                    <div className={css.users__header}>
                        <div className={css.user__name}>
                            {EN ? 'User' : 'Користувач'}
                        </div>
                        <div className={css.user__rating}>
                            {EN ? 'Rating' : 'Рейтинг'}
                        </div>
                    </div>
                    {
                        leaderBordTen?.data?.map(user =>
                            <div className={css.user__block} key={user.id}
                                 onClick={() => setUserId(user.attributes.userId)}>
                                <div className={css.user__name}>{user?.attributes?.userName}</div>
                                <div className={css.user__rating}>{user?.attributes?.rating}</div>
                            </div>
                        )
                    }
                    {userId && <UserBlock userId={userId} setUserId={setUserId}/>}
                </div>

                {leaderBordTen?.data?.length ?
                    ''
                    :
                    (EN ? <div>There are no users with this username <span
                                className={css.search__info_span}>!</span></div>
                            :
                            <div>Немає користувачів з таким юзернеймом <span
                                className={css.search__info_span}>!</span></div>
                    )
                }

                <Pagination key={leaderBordTen?.id}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            allPages={allPages}
                            setUserId={setUserId}
                            pagesArray={pagesArray}
                />
            </div>
        </div>
    );
};

export {RecruiterPage};
