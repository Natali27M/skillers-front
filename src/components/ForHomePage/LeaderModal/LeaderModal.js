import React, {useEffect, useState} from 'react';

import css from '../LeaderModal/LeaderModal.module.css';
import rootCss from '../../../styles/root.module.css';
import useComponentVisible from '../../../RootFunctions/useComponentVisible';
import getBadgesForLeader from '../../../RootFunctions/getBadgesForLeader';
import {Badge} from '../../ForUserPage/Badge/Badge';
import cross from '../../../images/cross.svg';
import {useSelector} from 'react-redux';


const LeaderModal = ({leader, setLeaderModal}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

    const [leaderBadges, setLeaderBadges] = useState(null);

    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollTop]);

    useEffect(() => {
        if (!isComponentVisible) {
            setLeaderModal(null);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        if (leader?.id) {
            getBadgesForLeader(leader?.attributes?.userId).then(value => setLeaderBadges(value));
        }
    }, [leader?.id]);

/*
    useEffect(() => {
        if (scrollTop > 0) {
            setLeaderModal(null);
        }
    }, [scrollTop]);*/

    return (
        <div className={css.leader__modal}>
            <div ref={ref} className={css.leader__modal_block}>
                <img className={css.cross__btn} onClick={() => setLeaderModal(null)} src={cross} alt="cross"/>
                <div className={rootCss.default__title_24}>{leader?.attributes?.userName}</div>
                <div className={css.leader__modal_info_wrap}>
                    <div>{EN ? 'Rating' : 'Рейтинг'}</div>
                    <div>{leader?.attributes?.rating}</div>
                </div>
                <div className={css.leader__modal_info_wrap}>
                    <div>{EN ? 'Rank' : 'Звання'}</div>
                    <div>{leader?.rank}</div>
                </div>
                {!!leaderBadges?.length &&
                    <div className={rootCss.default__title_24}>{EN ? 'Badges' : 'Нагороди'}</div>
                }
                <div className={css.badges__wrap}>
                    {leaderBadges?.map(badge => <Badge key={badge?.techId} badge={badge}/>)}
                </div>
            </div>
        </div>
    );
};

export {LeaderModal};