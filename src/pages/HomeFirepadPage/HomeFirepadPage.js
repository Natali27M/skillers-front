import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import css from './HomeFirepadPage.module.css';
import {compileServices} from '../../services';
import arrow from '../../images/arrow.svg';
import useComponentVisible from '../../RootFunctions/useComponentVisible';

const HomeFirepadPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const [language, setLanguage] = useState({id: 54, name: 'C++ (GCC 9.2.0)'});

    const [dropOpen, setDropOpen] = useState(false);

    const [langArray, setLangArray] = useState([]);

    const {ref} = useComponentVisible(true);

    const {register, handleSubmit, reset} = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        compileServices.getLanguages().then(value => setLangArray(value));
    }, []);

    const setLangValue = (lang) => {
        setLanguage(lang);
        setDropOpen(false);
    };

    const joinToRoom = (e) => {
        console.log(e.path);
        navigate(`${e.path}`);
    }

    return (
        <div className={css.team__coding_main}>
            {/*<div className={css.team__coding_wrap}>*/}
            <div className={css.result__wrap}>
                <div className={css.dropdown__container}>

                    <div className={css.dropdown__title}>
                        {EN ? 'Choose a programming language' : 'Виберіть мову програмування'}
                    </div>

                    <div className={css.dropdown__wrap} ref={ref}>

                        <div className={css.dropdown__btn} onClick={() => setDropOpen(!dropOpen)}>
                            <div>{language.name}</div>
                            <img className={dropOpen ? css.arrow__open : css.arrow__close} src={arrow} alt="arrow"/>
                        </div>

                        {dropOpen && <div className={css.drop__elements_wrap}>
                            {
                                langArray?.map(lang =>
                                    <div key={lang?.id}>
                                        {lang !== language &&
                                            <div onClick={() => setLangValue(lang)}
                                                 className={css.dropdown__element}>
                                                <Link to={`/team-coding/${lang.name}/${user?.id}`}
                                                      state={lang}>{lang?.name}</Link>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        </div>
                        }

                    </div>

                </div>

            </div>

            <div className={css.dropdown__title}>
                {EN ? 'Or join using your colleague\'s link' : 'Або приєднайтеся за посиланням вашого колеги'}
            </div>

            <form onSubmit={handleSubmit(joinToRoom)} className={css.join__room_form}>
                <input type="text" {...register('path')} className={css.join__room_input}/>
                <button className={css.join__room_btn}>{EN ? 'Join room' : 'Приєднатися до кімнати'}</button>
            </form>

            {/*</div>*/}
        </div>
    );
};

export {HomeFirepadPage};
