import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './LeaderBord.module.css';
import rootCSS from '../../../styles/root.module.css';
import pedestal from '../../../images/pedestal.svg';
import arrow from '../../../images/arrow.svg';
import {getLeaderBord, getLeaderBordByQuery} from '../../../store';
import {LeaderBlock, LeaderModal} from '../../../components';

const LeaderBord = ({getLeaderBoard}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {leaderBord} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    const [leaderModal, setLeaderModal] = useState(null);

    const [isQuery, setIsQuery] = useState(false);

    useEffect(() => {
        if (getLeaderBoard) {
            dispatch(getLeaderBord(pageNumber));
        }
    }, [pageNumber, getLeaderBoard]);

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

    return (
        <div className={css.leader__bord_wrap}>
            {leaderModal && <LeaderModal setLeaderModal={setLeaderModal} leader={leaderModal}/>}
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
                    <div className={css.leader__rank}> {EN ? 'Badges' : 'Нагороди'}</div>
                </div>
                {!!leaderBord?.data?.length && leaderBord?.data?.map(leader =>
                    <LeaderBlock setLeaderModal={setLeaderModal} key={leader?.id} leader={leader}
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
