import React from 'react';

import css from './PresentForUserAlways.module.css';
import {useSelector} from 'react-redux';

const PresentForUserAlways = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.presentBox}>
            <div className={css.banner__angle}></div>
            <div className={css.banner__content}>

            </div>
        </div>
    );
};

export {PresentForUserAlways};
