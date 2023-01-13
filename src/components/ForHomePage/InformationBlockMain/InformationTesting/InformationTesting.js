import React from 'react';

import testing from '../../../../images/information/testing.png'
import css from './InformationTesting.module.css'

const InformationTesting = () => {
    return (
        <div className={css.testing__main}>
            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>Testing</h4>

                <h5 className={css.testing__small_header}>Only the method of trial and error guarantees development.</h5>

                <p className={css.testing__description}>
                    Test your skills, create your own tests and get rewards and coins for it.
                </p>
            </div>

            <img src={testing} alt="testing" className={css.testing__img}/>
        </div>
    );
};

export {InformationTesting};
