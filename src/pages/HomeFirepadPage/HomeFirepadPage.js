import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import css from './HomeFirepadPage.module.css';
import {compileServices} from '../../services';
import arrow from '../../images/arrow.svg';
import useComponentVisible from '../../RootFunctions/useComponentVisible';

const HomeFirepadPage = () => {
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
        navigate(`${e.path}`);
    }

    return (
        <div>
            <div className={css.result__wrap}>
                <div className={css.dropdown__container}>

                    <div className={css.dropdown__title}>
                        Choose Language
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
                                                <Link to={`/firepad/${lang.name}/${user?.id}`} state={user?.id} >{lang?.name}</Link>
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


            <form onSubmit={handleSubmit(joinToRoom)} className={css.join__room_form}>
                <input type="text" {...register('path')} className={css.join__room_input}/>
                <button>Join room</button>
            </form>

        </div>
    );
};

export {HomeFirepadPage};
