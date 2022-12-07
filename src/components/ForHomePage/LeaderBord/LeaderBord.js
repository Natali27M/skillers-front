import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './LeaderBord.module.css';
import rootCSS from '../../../styles/root.module.css'
import pedestal from '../../../images/pedestal.svg';
import arrow from '../../../images/arrow.svg';
import {getLeaderBord, getLeaderBordByQuery} from '../../../store/slices/achievments.slice';
import {LeaderBlock, PresentForUserAlways} from '../../../components';
import {getAllUsers} from '../../../store';

const LeaderBord = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {leaderBord} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    const [isQuery, setIsQuery] = useState(false);

    useEffect(() => {
        dispatch(getLeaderBord(pageNumber));
    }, [pageNumber]);

    const handleChange = (e) => {
        const data = e.target.value;
        setPageNumber(1);
        if (data === '') {
            dispatch(getLeaderBord(pageNumber));
            setIsQuery(false);
        } else {
            dispatch(getLeaderBordByQuery({query: data, pageNumber}));
            setIsQuery(true);
        }
    };

    // leaderBord?.data?.map(value => console.log(value))

    const {allUsers} = useSelector(state => state['userReducers']);

    useEffect(() => {
        dispatch(getAllUsers());
        //     dispatch(getLeaderBord(pageNumber));
    }, []);
    // }, [pageNumber]);

    let users = [];
    console.log(leaderBord?.data,'leaderBord');
    // console.log(allUsers,'allUsers');

    leaderBord?.data?.map(value => users.push(value.attributes.userId));

    console.log(users,'users');

    // for (const allUser of allUsers) {
    //     // console.log(allUser,'user');
    //     // console.log(leader.attributes.userId,'achievement');
    //     // if(allUser.id !== leader.attributes.userId) {
    //     //     console.log(allUser);
    //     //     // users.push(allUser)
    //     // }
    //     leaderBord?.data?.map(value => console.log(value.attributes.userId,'+++'))
    //     console.log(allUser.id,'---');
    //     let user = leaderBord?.data?.find(value => value.attributes.userId !== allUser.id)
    //     console.log(user,'user');
    // }
    // console.log(users,'user');

    // console.log(users,'filter');

    return (
            <div className={css.leader__bord_wrap}>
                <div className={rootCSS.default__title_34}>
                    {EN ? 'Leader board' : 'Фаворити'}
                </div>
                <form className={css.search__user_form}>
                    <input
                        type="text"
                        className={css.search__user_input}
                        placeholder={EN ? 'Search from leaders' : 'Пошук серед лідерів'}
                        onChange={e => handleChange(e)}
                    />
                </form>
                <div className={css.leader__wrap}>
                    <div className={css.leader__header}>
                        <div className={css.position}>
                            <img className={css.pedestal__img} src={pedestal} alt="pedestal"/>
                        </div>
                        <div className={css.leader__name}> {EN ? 'User' : 'Користувач'}</div>
                        <div className={css.leader__rating}> {EN ? 'Rating' : 'Рейтинг'}</div>
                        <div className={css.leader__rank}> {EN ? 'Rank' : 'Звання'}</div>
                    </div>
                    {!!leaderBord?.data?.length && leaderBord?.data?.map(leader =>
                        <LeaderBlock key={leader?.id} leader={leader}
                                     position={!isQuery && leaderBord?.data?.indexOf(leader) + 1 + 15 * (pageNumber - 1)}
                        />
                    )}
                </div>
                <div className={css.pagination__wrap}>
                    <div className={css.pagination__block}>
                        <img src={arrow} alt="arrow" className={css.arrow__left}
                             onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}/>
                        <div>{pageNumber} / {leaderBord?.meta?.pagination?.pageCount}</div>
                        <img src={arrow} alt="arrow" className={css.arrow__right}
                             onClick={() => pageNumber < leaderBord.meta?.pagination?.pageCount && setPageNumber(pageNumber + 1)}/>
                    </div>
                </div>

            </div>
    );
};

export {LeaderBord};
