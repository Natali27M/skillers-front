import React from 'react';

import css from './PresentForUserAlways.module.css';
import {useSelector} from 'react-redux';

const PresentForUserAlways = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.presentBox}>

                <div className={css.overlay}>

                    <div className={css.text}>
                        {EN ?
                            <h2>
                                <span className={css.name}>Skilliant</span> pays <span className={css.span}>100$</span> <br/>
                                for the first <span className={css.span}>10</span> users <br/>
                                in the leaderboard
                            </h2>
                        :
                            <h2>
                                <span className={css.name}>Skilliant</span> платить <span className={css.span}>100$</span> для <br/>
                                перших <span className={css.span}>10</span> користувачів <br/>
                                у таблиці лідерів
                            </h2>
                        }
                    </div>

                </div>

        </div>
    );
};

export {PresentForUserAlways};
