import React from 'react';

import modalCss from '../TimeIsUpModal/TimeIsUpModal.module.css';
import css from './StartTestModal.module.css';
import {useSelector} from 'react-redux';
import timeDisplay from '../../../RootFunctions/timeDisplay';
import rootCss from '../../../styles/root.module.css';
import {Link, useNavigate} from 'react-router-dom';

const StartTestModal = ({test, setTestStarted}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const navigate = useNavigate()

    return (
        <div className={modalCss.timeIsUp__modal}>
            <div className={modalCss.modal__block}>
                <div className={modalCss.modal__title}>
                    {test?.testName}
                </div>
                <div className={css.description}>
                    {test?.description}
                </div>
                <div className={css.time}>
                    <div>
                        {EN ? 'Allotted time' : 'Відведений час'}
                    </div>
                    <div>{timeDisplay(test?.timeSeconds)}</div>
                </div>
                <div onClick={() => setTestStarted(true)} className={rootCss.default__button}>
                    {EN ? 'Start' : 'Розпочати'}
                </div>
                <div className={modalCss.toMain__btn} onClick={() => navigate(-1)}>{EN ? 'Back' : 'Назад'}</div>
            </div>
        </div>
    );
};

export {StartTestModal};