import React from 'react';
import css from './SignUpModal.module.css';
import rootCSS from '../../../styles/root.module.css';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const SignUpModal = ({type, setModalOpen}) => {
    const {EN} = useSelector(state => state['languageReducers']);


    return (
        <div className={css.modal__wrap}>
            <div className={css.modal__block}>
                <div className={css.modal__text}>
                    {EN ? 'You passed the test successfully ' +
                        'but, unfortunately, you won\'t be able to ' +
                        'save the result and ' +
                        'compete with others ' +
                        'by users. We advise you to register to save your result next time' : 'Ви успішно пройшли тест, але, на жаль, не зможете ' +
                        'зберегти результат та позмагатися з іншими користувачами. ' +
                        'Радимо зареєструватись, щоб наступного разу зберегти свій результат'}
                </div>
                <Link to={'/registration'} className={rootCSS.default__button}>
                    {EN ? 'Register now' : 'Зареєструватись зараз'}
                </Link>
                <div onClick={() => setModalOpen(false)}
                     className={css.no__thanks}>{EN ? 'No, thanks' : 'Ні, дякую'}</div>
            </div>
        </div>
    );
};

export {SignUpModal};