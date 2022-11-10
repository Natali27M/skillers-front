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
                    <p className={css.banner__text}><span className={css.banner__name}>Skilliant </span>
                        will split <span className={css.banner__underline}>100$</span><br/>
                        between by the first <span className={css.banner__underline}>10</span><br/>
                        users in the table
                    </p>
                    :
                    <p className={css.banner__text}> <span className={css.banner__name}>Skilliant </span>
                        розділить <span className={css.banner__underline}>100$</span> між<br/>
                        першими <span className={css.banner__underline}>10</span> користувачами <br/>
                        у таблиці лідерів
                    </p>

                    // <p className={css.banner__text}><span className={css.banner__name}>Skilliant </span>
                    // pays <span className={css.banner__underline}>100$</span> <br/>
                    // for the first <span className={css.banner__underline}>10</span> users <br/>
                    // in the leaderbord
                    // </p>

                    // <p className={css.banner__text}>
                    //     <span className={css.banner__underline}>10</span> користувачів<span className={css.banner__name}>Skilliant </span>
                    //     розділять між собою<span className={css.banner__underline}>100$</span>
                    // </p>
                    // <p className={css.banner__text}> <span className={css.banner__name}>Skilliant </span>
                    //     платить <span className={css.banner__underline}>100$</span> для<br/>
                    //     перших <span className={css.banner__underline}>10</span> користувачів <br/>
                    //     у таблиці лідерів
                    // </p>
                }
            </div>
        </div>
    );
};

export {PresentForUserAlways};
