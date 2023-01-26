import React from 'react';

import css from './ResponseModal.module.css';
import rootCss from '../../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';
import cross from '../../../images/cross.svg';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {createVacancyResponse} from '../../../store/slices/vacancyResponses.slice';

const ResponseModal = ({vacancy, setResponseTime, userId}) => {
    const {EN} = useSelector(state => state['languageReducers']);


    const dispatch = useDispatch();

    const {
        register, handleSubmit, reset
    } = useForm();

    const sendResponse = (obj) => {
        dispatch(createVacancyResponse({
            ...obj,
            vacancyId: vacancy?.id,
            userId
        }));
        setResponseTime(false);
        reset();
    };

    return (
        <div className={css.response__modal_wrap}>
            <div className={css.response__modal_block}>
                <img onClick={() => setResponseTime(false)} className={css.close__btn} src={cross} alt="croos"/>
                <h2 className={rootCss.default__title_24}>
                    {EN ? 'Vacancy review' : 'Відгук на вакансію'}
                </h2>
                <h3 className={css.vacancy__title_wrap}>
                    {vacancy?.attributes?.title}
                </h3>
                <form className={css.response__modal_form} onSubmit={handleSubmit(sendResponse)}>
                    <textarea
                        placeholder={EN ? 'Write the cover letter' : 'Напишіть супровідний лист'}
                        {...register('coverLetter')}
                        autoComplete="off"
                        autoCorrect="off"
                        className={css.vacancy__textarea}
                    />
                    <Link to={'/user'} className={css.vacancy__info}>
                        {EN ? 'The employer will see the resume that you' +
                            ' have uploaded to the profile on the user page, if you have not ' +
                            'yet uploaded it, but you have such a desire, then close' +
                            ' this window and go to the user page to upload the resume' :
                            'Роботодавець бачитиме резюме, яке ви завантажили у профіль ' +
                            'на сторінці користувача, якщо ви ще його не ' +
                            'завантажили, але маєте таке бажання, то закрийте це' +
                            ' вікно та зайдіть на сторінку користувача, щоб завантажити резюме'
                        }
                    </Link>
                    <button className={rootCss.default__button}>{EN ? 'Send' : 'Надіслати'}</button>
                </form>


            </div>
        </div>
    );
};

export {ResponseModal};
