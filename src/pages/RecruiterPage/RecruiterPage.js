import React, {useEffect, useState} from 'react';
import css from './RecruiterPage.module.css';
import rootCSS from '../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';

import {getLeaderBordByQuery, setLeaderBordClear} from '../../store/slices/achievments.slice';
import {UserBlock} from '../../components';
import {Navigate} from 'react-router-dom';

const RecruiterPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {roles} = useSelector(state => state['userReducers']);

    const {leaderBord} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);

    const [isQuery, setIsQuery] = useState(false);

    const handleChange = (e) => {

        e.preventDefault();
        const data = e.target.value;
        if (data?.length) {
            setIsQuery(true);
            dispatch(getLeaderBordByQuery({query: data, pageNumber: 1}));
        } else {
            setIsQuery(false);
            dispatch(setLeaderBordClear());
        }
    };

    useEffect(() => {
        dispatch(setLeaderBordClear());
    }, []);

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
                            {EN ? 'Rating' : 'Рейтинг'}
                        </div>
                    </div>
                    {
                        leaderBord?.data?.map(user =>
                            <div className={css.user__block} key={user.id} onClick={() => setUserId(user.attributes.userId)}>
                                <div className={css.user__name}>{user?.attributes?.userName}</div>
                                <div className={css.user__rating}>{user?.attributes?.rating}</div>
                            </div>
                        )
                    }
                    <div className={css.search__info}>
                        {isQuery ?
                            (leaderBord?.data?.length ?
                                ''
                                :
                                (EN ? 'There are no users with this username' : 'Немає користувачів з таким юзернеймом'))
                            :
                            (EN ? 'Enter search query' : 'Введіть пошуковий запит')}
                    </div>
                </div>
                {userId && <UserBlock userId={userId}/>}
            </div>
        </div>
    );
};

export {RecruiterPage};