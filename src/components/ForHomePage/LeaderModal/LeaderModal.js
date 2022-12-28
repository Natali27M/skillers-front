import React, {useEffect} from 'react';

import css from '../LeaderModal/LeaderModal.module.css';
import rootCss from '../../../styles/root.module.css';
import useComponentVisible from '../../../RootFunctions/useComponentVisible';
import {Badge} from '../../ForUserPage/Badge/Badge';
import cross from '../../../images/cross.svg';
import {useSelector} from 'react-redux';


const LeaderModal = ({leader, setLeaderModal}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setLeaderModal(null);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);

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
                {!!leader?.leaderBadges?.length &&
                    <div className={rootCss.default__title_24}>{EN ? 'Badges' : 'Нагороди'}</div>
                }
                <div className={css.badges__wrap}>
                    {leader?.leaderBadges?.map(badge => <Badge key={badge?.techId} badge={badge}/>)}
                </div>
            </div>
        </div>
    );
};

export {LeaderModal};