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
                         will split <span className={css.banner__underline}>100$</span><br/>
                        between by the first <span className={css.banner__underline}>10</span><br/>
                        users in the table
                    </div>
                    :
                    <div className={css.banner__text}> <span className={css.banner__name}>Skilliant </span>
                        розділить <span className={css.banner__underline}>100$</span> між<br/>
                        першими <span className={css.banner__underline}>10</span> користувачами <br/>
                        у таблиці лідерів
                    </div>
                }
            </div>
        </div>
    );
};

export {PresentForUserAlways};
