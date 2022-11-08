import React from 'react';

import css from './PresentForUserAlways.module.css';

const PresentForUserAlways = () => {

    return (
        <div className={css.presentBox}>

                <div className={css.overlay}>

                    <div className={css.text}>
                        <h2>
                            <span className={css.name}>Skilliant</span> платить <span>100$</span> для <br/>
                            перших <span>10</span> користувачів <br/>
                            у таблиці лідерів
                        </h2>
                    </div>

                </div>

        </div>
    );
};

export {PresentForUserAlways};
