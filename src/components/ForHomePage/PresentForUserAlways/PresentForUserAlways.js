import React from 'react';

import css from './PresentForUserAlways.module.css';

const PresentForUserAlways = () => {
    return (
        <div className={css.presentBox}>
            <div className={css.text}>
                <h2> <span className={css.name}>
                    Skilliant</span> платить <span>100$</span> для перших <span>10</span> користувачів у таблиці лідерів
                </h2>
            </div>
        </div>
    );
};

export {PresentForUserAlways};
