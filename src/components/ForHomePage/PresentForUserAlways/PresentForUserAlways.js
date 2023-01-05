import React from 'react';
import {useSelector} from 'react-redux';

import css from './PresentForUserAlways.module.css';


const PresentForUserAlways = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.banner__box}>
            <div className={css.banner__angle}></div>

            <div className={css.banner__content}>
                {EN ?
                    <div className={css.banner__text}><span className={css.banner__name}>Skilliant</span>
                        will split <span className={css.banner__underline}>100$</span> by own crypto token between the
                        top <span
                            className={css.banner__underline}>3</span> leaders from the table
                    </div>
                    :
                    <div className={css.banner__text}><span className={css.banner__name}>Skilliant </span>
                        розділить <span className={css.banner__underline}>100$</span> власним токеном між <span
                            className={css.banner__underline}>3</span> найкращими користувачами
                        в рейтинговій таблиці
                    </div>
                }
            </div>
        </div>
    );
};

export {PresentForUserAlways};
