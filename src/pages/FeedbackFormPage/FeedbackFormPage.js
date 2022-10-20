import React, {useState} from 'react';
import css from './FeedbackFormPage.module.css';
import rootCSS from '../../styles/root.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import cross from '../../images/cross.svg';
import {createFeedback} from '../../store';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {FeedbackValidator} from '../../validation';


const FeedbackFormPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: joiResolver(FeedbackValidator)});

    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    const makeFeedback = (obj) => {
        dispatch(createFeedback(obj));
        reset();
        setModalOpen(true);
        setTimeout(() => {
            setModalOpen(false);
        }, 2000);
    };


    return (
        <div className={css.feedback__form_page}>
            <div className={css.feedback__form__bg}></div>
            <div className={css.feedback__form_wrap}>
                <div className={rootCSS.default__title_34}>
                    {EN ? 'Feedback' : 'Зворотний зв\'язок'}
                </div>
                <form className={css.feedback__form} onSubmit={handleSubmit(makeFeedback)}>
                    <input
                        type="text"
                        className={errors.userName ? css.feedback__input_error : css.feedback__input}
                        placeholder={EN ? 'Name' : 'Ім\'я'}
                        {...register('userName')}
                    />
                    <input
                        type="text"
                        className={errors.email ? css.feedback__input_error : css.feedback__input}
                        placeholder="Email"

                        {...register('email')}
                    />
                    <textarea
                        className={errors.message ? css.feedback__textarea_error : css.feedback__textarea}
                        placeholder={EN ? 'Message' : 'Відгук'}
                        {...register('message')}
                    />
                    <button className={rootCSS.default__button}>
                        {EN ? 'Send' : 'Надіслати'}
                    </button>
                </form>
                <div className={modalOpen ? css.feedback__modal_open : css.feedback__modal}>
                    {EN ? 'Thank you for your feedback' : 'Дякуємо за ваш відгук'}
                    <img className={css.modal__cross} src={cross} alt="cross" onClick={() => setModalOpen(false)}/>
                </div>
            </div>
        </div>
        
    );
};

export {FeedbackFormPage};