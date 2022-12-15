import React from 'react';

import css from './TimeIsUpModal.module.css';
import rootCss from '../../../styles/root.module.css';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

const TimeIsUpModal = ({tryAgain}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const navigate = useNavigate()

    return (
        <div className={css.timeIsUp__modal}>
            <div className={css.modal__block}>
                <div className={css.modal__title}>
                    {EN ? 'Unfortunately, the time is up' : 'На жаль, час вийшов'}
                </div>
                <div onClick={() => tryAgain()} className={rootCss.default__button}>
                    {EN ? 'Try again' : 'Спробуйте ще раз'}
                </div>
                <Link className={css.toMain__btn} to={'/'}>{EN ? 'To main' : 'На головну'}</Link>
            </div>
        </div>
    );
};

export {TimeIsUpModal};