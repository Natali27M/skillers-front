import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import css from './HomeFirepadPage.module.css';
import {compileServices} from '../../services';
import useComponentVisibleForOnlineCoding from '../../RootFunctions/useComponentVisibleForOnlineCoding';
import dropArrow from '../../images/arrow-color.png';
import {ref, set} from 'firebase/database';
import {db} from '../../firebaseConfig';

const HomeFirepadPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const [language, setLanguage] = useState({id: 54, name: 'C++ (GCC 9.2.0)'});

    const [dropOpen, setDropOpen] = useState(false);

    const [langArray, setLangArray] = useState([]);

    const {myRef} = useComponentVisibleForOnlineCoding(true);

    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        compileServices.getLanguages().then(value => setLangArray(value));
    }, []);

    const setLangValue = (lang) => {
        setTimeout(() => {
        if(user) {
        const name = lang.name.split('(')[0].trim();

        const path = `${user?.id}-${name}`

        setLanguage(lang);
        setDropOpen(false);

        set(ref(db, `/${path}`), {
            code: ' ',
            userId: `${user?.id}`
        }).then(r => r);

        navigate(`/team-coding/${name}-${lang.id}/${user?.id}/${lang.name}`);
        } else {
            navigate(`/registration`)
        }
        }, 300);
    };

    const joinToRoom = (e) => {
        const {pageLink} = e;
        navigate(`${pageLink}`);
    }

    return (
        <div className={css.team__coding_page}>
            <div className={css.team__coding_page_bg}></div>
            <div className={css.team__coding_wrap}>

                <div
                    className={css.dropdown__main_title}>{EN ? 'Collaborative programming' : 'Спільне програмування'}</div>

                <div className={css.result__wrap}>
                    <div className={css.dropdown__container}>

                        <div className={css.dropdown__wrap} ref={myRef}>

                            <div className={css.dropdown__title}>
                                {EN ? 'Create a new room' : 'Створіть нову кімнату'}
                            </div>

                            <div className={css.dropdown__btn} onClick={() => setDropOpen(!dropOpen)}>
                                <input type="text" {...register('path')}
                                       className={css.join__room_input_language}
                                       placeholder={EN ? 'Choose compiler' : 'Виберіть компілятор'}/>
                                <div className={dropOpen ? css.tech__drop_arrow_side : css.tech__drop_arrow}>
                                    <img src={dropArrow} alt="dropArrow" style={{width: "24px", height: "24px"}}/>
                                </div>
                            </div>

                            {dropOpen && <div className={css.drop__elements_wrap}>
                                {
                                    langArray?.map(lang =>
                                        <div key={lang?.id}>
                                            {lang !== language &&
                                                <div onClick={() => setLangValue(lang)}
                                                     className={css.dropdown__element}>
                                                    {lang.name}
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

                <div className={css.team__coding_hr_box}>
                    <div className={css.team__coding_hr}></div>
                    <div className={css.team__coding_or}>
                        {EN ? 'OR' : 'АБО'}
                    </div>
                    <div className={css.team__coding_hr}></div>
                </div>

                <div className={css.team__coding_box}>
                    <div className={css.dropdown__title}>
                        {EN ? 'Join an existing room' : 'Приєднайтеся до наявної кімнати'}
                    </div>

                    <form onSubmit={handleSubmit(joinToRoom)} className={css.join__room_form}>
                        <input type="text" {...register('pageLink')}
                               className={css.join__room_input}
                               placeholder={EN ? 'Enter the room link' : 'Введіть посилання на кімнату'}/>
                        <button
                            className={css.join__room_btn}>{EN ? 'Join room' : 'Приєднатися до кімнати'}</button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export {HomeFirepadPage};

