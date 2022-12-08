import React, {useEffect, useState} from 'react';
import css from './RecruiterPage.module.css';
import rootCSS from '../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';

import {getLeaderBord, getLeaderBordByQuery, setLeaderBordClear} from '../../store/slices/achievments.slice';
import {getAllUsers, getAllUsersByQuery} from '../../store';
import {UserBlock} from '../../components';
import {Navigate} from 'react-router-dom';
import arrow from '../../images/arrow.svg';

const RecruiterPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {roles, allUsers} = useSelector(state => state['userReducers']);

    const {leaderBord} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);

    const [isQuery, setIsQuery] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);

    const [startNumber, setStartNumber] = useState(0);

    // useEffect(() => {
    //     dispatch(getLeaderBord(pageNumber));
    // }, [pageNumber]);

    useEffect(() => {
        dispatch(getAllUsers(startNumber));
    }, [startNumber]);

    const handleChange = (e) => {

        e.preventDefault();
        setStartNumber(0);
        const data = e.target.value;
        setStartNumber(0);
        if (data === '') {
            dispatch(getAllUsers(startNumber));
            setIsQuery(false);
        } else {
            dispatch(getAllUsersByQuery({query: data, startNumber}));
            setIsQuery(true);
        }
    };

    // const handleChange = (e) => {
    //
    //     e.preventDefault();
    //     setPageNumber(1);
    //     const data = e.target.value;
    //     setPageNumber(1);
    //     if (data === '') {
    //         dispatch(getLeaderBord(pageNumber));
    //         setIsQuery(false);
    //     } else {
    //         dispatch(getLeaderBordByQuery({query: data, pageNumber}));
    //         setIsQuery(true);
    //     }
    // };


    if (!(roles?.includes('admin'))) {
        return <Navigate to={'/user'} replace/>;
    }

    return (
        <div className={css.recruiter__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.recruiter__wrap}>
                <div className={css.user__search_wrap}>
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
                            {EN ? 'Email' : 'Електронна пошта'}
                        </div>
                    </div>
                    {
                        allUsers?.map(user =>
                            <div className={css.user__block} key={user.id}
                                 onClick={() => setUserId(user.id)}>
                                <div className={css.user__name}>{user?.username}</div>
                                <div className={css.user__rating}>{user?.email}</div>
                            </div>
                        )
                    }

                    {userId && <UserBlock userId={userId}/>}

                    <div className={css.search__info}>
                        {allUsers.length ?
                            ''
                            :
                            (EN ? 'There are no users with this username' : 'Немає користувачів з таким юзернеймом')
                        }
                    </div>
                </div>
                <div className={css.pagination__wrap}>
                    <div className={css.pagination__block}>
                        <img src={arrow} alt="arrow" className={css.arrow__left}
                             onClick={() => startNumber > 0 && setStartNumber(startNumber - 10)}/>
                        <div>Prew / Next</div>
                        <img src={arrow} alt="arrow" className={css.arrow__right}
                             onClick={() => allUsers.length === 10 && setStartNumber(startNumber + 10)}/>
                    </div>
                </div>


                {/*<div className={css.users__wrap}>*/}
                {/*    <div className={css.users__header}>*/}
                {/*        <div className={css.user__name}>*/}
                {/*            {EN ? 'User' : 'Користувач'}*/}
                {/*        </div>*/}
                {/*        <div className={css.user__rating}>*/}
                {/*            {EN ? 'Rating' : 'Рейтинг'}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    {*/}
                {/*        leaderBord?.data?.map(user =>*/}
                {/*            <div className={css.user__block} key={user.id}*/}
                {/*                 onClick={() => setUserId(user.attributes.userId)}>*/}
                {/*                <div className={css.user__name}>{user?.attributes?.userName}</div>*/}
                {/*                <div className={css.user__rating}>{user?.attributes?.rating}</div>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    }*/}
                {/*    <div className={css.search__info}>*/}
                {/*        {leaderBord?.data?.length ?*/}
                {/*            ''*/}
                {/*            :*/}
                {/*            (EN ? 'There are no users with this username' : 'Немає користувачів з таким юзернеймом')*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={css.pagination__wrap}>*/}
                {/*    <div className={css.pagination__block}>*/}
                {/*        <img src={arrow} alt="arrow" className={css.arrow__left}*/}
                {/*             onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}/>*/}
                {/*        <div>{pageNumber} / {leaderBord?.meta?.pagination?.pageCount}</div>*/}
                {/*        <img src={arrow} alt="arrow" className={css.arrow__right}*/}
                {/*             onClick={() => pageNumber < leaderBord.meta?.pagination?.pageCount && setPageNumber(pageNumber + 1)}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*{userId && <UserBlock userId={userId}/>}*/}
            </div>
        </div>
    );
};

export {RecruiterPage};
