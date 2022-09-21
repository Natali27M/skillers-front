import React from 'react';
import {useSelector} from 'react-redux';
import css from './LeaderBord.module.css';
import pedestal from '../../../images/pedestal.svg'

const LeaderBord = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {leaderBord} = useSelector(state => state['achievementsReducers']);


    return (
        <div className={css.leader__bord_wrap}>
            <div className={css.leader__title}>
                {EN ? 'Leader board' : 'Фаворити'}
            </div>
            <div className={css.leader__wrap}>
                <div className={css.leader__header}>
                    <div className={css.position}>
                        <img className={css.pedestal__img} src={pedestal} alt="pedestal"/>
                    </div>
                    <div className={css.leader__name}> {EN ? 'User' : 'Користувач'}</div>
                    <div className={css.leader__rating}> {EN ? 'Rating' : 'Рейтинг'}</div>
                </div>
                {!!leaderBord?.length && leaderBord.map(leader =>
                    <div className={css.leader__block} key={leader.id}>
                        <div className={css.position}>{leaderBord.indexOf(leader) + 1}</div>
                        <div className={css.leader__name}> {leader.attributes.userName}</div>
                        <div className={css.leader__rating}>{leader.attributes.rating}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export {LeaderBord};