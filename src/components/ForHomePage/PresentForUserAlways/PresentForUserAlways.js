import React from 'react';

import css from './PresentForUserAlways.module.css';
import {useSelector} from 'react-redux';

const PresentForUserAlways = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.presentBox}>
            <div className={css.banner__angle}></div>
            <div className={css.banner__content}>
                {EN ?
                    <div>
                        <p> <span className={css.span}>Skilliant</span> pays <span className={css.span}>100$</span></p>
                        <p>for the first <span className={css.span}>10</span> users</p>
                        <p>in the leaderbord</p>
                    </div>
                    :
                    <div>
                        <p> <span className={css.span}>Skilliant</span> платить <span className={css.span}>100$</span></p>
                        <p>для перших <span className={css.span}>10</span> користувачів</p>
                        <p>у таблиці лідерів</p>
                    </div>
                }
            </div>
        </div>
    );
};

export {PresentForUserAlways};
