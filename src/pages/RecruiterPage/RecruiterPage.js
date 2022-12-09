import React, {useEffect, useState} from 'react';
import css from './RecruiterPage.module.css';
import rootCSS from '../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';

import {getLeaderBordTen, getLeaderBordByQueryTen} from '../../store/slices/achievments.slice';
import {UserBlock} from '../../components';
import {Navigate} from 'react-router-dom';

import DoubleArrowSideGrey from '../../images/dobleArrow-grey.svg';
import doubleArrowSide from '../../images/dobleArrow.svg';
import arrowSideGrey from '../../images/arrow-grey.svg';
import arrowSide from '../../images/arrow.svg';
import pagination from '../../RootFunctions/pagination';

const RecruiterPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {roles} = useSelector(state => state['userReducers']);

    const {leaderBordTen} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);

    // const [isQuery, setIsQuery] = useState(false);

    const [currenPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getLeaderBordTen(currenPage));
    }, [currenPage]);

    const allPages = leaderBordTen?.meta?.pagination?.pageCount;

    const pagesArray = pagination(allPages, currenPage);

    const handleChange = (e) => {
        e.preventDefault();

        setCurrentPage(1);
        const data = e.target.value;

        if (data === '') {
            dispatch(getLeaderBordTen(currenPage));
            // setIsQuery(false);
        } else {
            dispatch(getLeaderBordByQueryTen({query: data, currenPage}));
            // setIsQuery(true);
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

                <div className={css.search__info}>
                    {leaderBordTen?.data?.length ?
                        ''
                        :
                        (EN ? <div className={css.search__info}>There are no users with this username <span
                                    className={css.search__info_span}>!</span></div>
                                :
                                <div className={css.search__info}>Немає користувачів з таким юзернеймом <span
                                    className={css.search__info_span}>!</span></div>
                        )
                    }
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
                    {userId && <UserBlock userId={userId}/>}
                </div>

                <div className={css.pagination__wrap}>
                    <div className={css.pagination__container}>
                        {allPages > 4 &&
                            <img className={css.arrow__left} src={currenPage === 1 ? DoubleArrowSideGrey : doubleArrowSide}
                                 alt="arrow"
                                 onClick={() => currenPage !== 1 && setCurrentPage(1) || setUserId(null)}/>}

                        <img className={css.arrow__left} src={currenPage === 1 ? arrowSideGrey : arrowSide} alt="arrow"
                             onClick={() => currenPage > 1 && setCurrentPage(currenPage - 1) || setUserId(null)}/>

                        {pagesArray?.map(page =>
                            <div onClick={() => page !== currenPage && setCurrentPage(page) || setUserId(null)}
                                 className={currenPage === page ? css.pagination__number_active : css.pagination__number}
                                 key={page}>
                                {page}
                            </div>
                        )}

                        <img className={css.arrow__right} src={currenPage === allPages ? arrowSideGrey : arrowSide}
                             alt="arrow"
                             onClick={() => currenPage < allPages && setCurrentPage(currenPage + 1) || setUserId(null)}/>
                        {allPages > 4 && <img className={css.arrow__right}
                                              src={currenPage === allPages ? DoubleArrowSideGrey : doubleArrowSide}
                                              alt="arrow"
                                              onClick={() => currenPage !== allPages && setCurrentPage(allPages) || setUserId(null)}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export {RecruiterPage};
