import React from 'react';

import css from './UserBadges.module.css';
import {useSelector} from 'react-redux';
import {Badge} from '../Badge/Badge';


const UserBadges = () => {

    const {resultBadges} = useSelector(state => state['badgesReducers']);

    return (
        <div className={css.badges__wrap}>
            {resultBadges?.map(badge => <Badge key={badge?.techId} badge={badge}/>)}
        </div>
    );
};

export {UserBadges};