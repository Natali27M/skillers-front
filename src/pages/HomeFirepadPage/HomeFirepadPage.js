import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { uid } from "uid";
import {Helmet} from 'react-helmet-async';

import css from './HomeFirepadPage.module.css';
import rootCSS from '../../styles/root.module.css';
import useComponentVisibleForOnlineCoding from '../../RootFunctions/useComponentVisibleForOnlineCoding';
import dropArrow from '../../images/arrow-color.png';
import {ref, set} from 'firebase/database';
import {db} from '../../firebaseConfig';
import arrayLanguageCompiler from '../../RootFunctions/arrayLanguageCompiler';

const HomeFirepadPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const [language, setLanguage] = useState({});

    const [dropOpen, setDropOpen] = useState(false);

    const {myRef} = useComponentVisibleForOnlineCoding(true);

    const arrLanguage = arrayLanguageCompiler();

    const {register, handleSubmit, setValue} = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        setValue('path', language.name);
        setDropOpen(false);
    }, [language]);

    const setLangValue = () => {
        const name = language?.name.split('(')[0].trim();

        const uuid = uid();

        const path = `${user?.id}-${name}-${uuid}`

        setDropOpen(false);

        set(ref(db, `/${path}`), {
            code: ' ',
            userId: `${user?.id}`,
            uuid
        }).then(r => r);

        navigate(`/team-coding/${name}-${language?.id}/${user?.id}/${language?.name}/${uuid}`);
    };

    const joinToRoom = (e) => {
        const {pageLink} = e;
        const arrayElementLink = pageLink.split('/').slice(3).map(value => value + ('/'));
        let link = '/';

        for (const element of arrayElementLink) {
            link = link + element;
        }
        navigate(`${link}`);
    };

    const title = 'Collaborative programming';
    const description = 'Ability to create a room with a choice of programming language, or join a room';
    const url = 'https://skilliant.net/team-coding';

    return (
        <div className={css.team__coding_page}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="skilliant.net"/>
                <title>{title}</title>
                <link rel="canonical" href={url}/>
            </Helmet>

            <div className={css.team__coding_page_bg}></div>
            <div className={css.team__coding_wrap}>

                <h2
                    className={css.dropdown__main_title}>{EN ? 'Collaborative programming' : 'Спільне програмування'}
                </h2>

                <div className={css.result__wrap}>
                    <div className={css.dropdown__container}>

                        <div className={css.dropdown__wrap} ref={myRef}>

                            <h3 className={css.dropdown__title}>
                                {EN ? 'Create a new room' : 'Створіть нову кімнату'}
                            </h3>

                            <div className={css.dropdown__btn} onClick={() => user && setDropOpen(!dropOpen)}>

                                {!language.name && user &&
                                    <div className={css.join__room_input_language}>
                                        {EN ? 'Choose compiler' : 'Виберіть компілятор'}
                                    </div>
                                }

                                {language.name && user &&
                                    <div className={css.join__room_input_language_active}>
                                        {language.name}
                                    </div>
                                }

                                {!user && <div className={css.error}>
                                    {EN ? 'This action is available only to registered users'
                                        :
                                        'Ця дія доступна тільки зареєстрованим користувачам'
                                    }
                                </div>}

                                {user &&
                                    <div className={dropOpen ? css.tech__drop_arrow_side : css.tech__drop_arrow}>
                                        <img src={dropArrow} alt="dropArrow" style={{width: '24px', height: '24px'}}/>
                                    </div>
                                }
                            </div>

                            {dropOpen && <div className={css.drop__elements_wrap}>
                                {
                                    arrLanguage?.map(lang =>
                                        <div key={lang?.id}>
                                            {lang !== language &&
                                                <div onClick={() => setLanguage(lang)}
                                                     className={css.dropdown__element}>
                                                    {lang.name}
                                                </div>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            }

                            {user &&
                                <button onClick={() => setLangValue()} className={rootCSS.default__button}>
                                    {EN ? 'Create room' : 'Створити кімнату'}
                                </button>}

                            {!user &&
                                <button onClick={() => navigate('/registration')} className={rootCSS.default__button}>
                                    {EN ? 'Registration' : 'Зареєструватися'}
                                </button>}

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
                    <h3 className={css.dropdown__title}>
                        {EN ? 'Join an existing room' : 'Приєднайтеся до наявної кімнати'}
                    </h3>

                    <form onSubmit={handleSubmit(joinToRoom)} className={css.join__room_form}>
                        <input type="text" {...register('pageLink')}
                               className={css.join__room_input}
                               placeholder={EN ? 'Enter the room link' : 'Введіть посилання на кімнату'}/>
                        <button
                            className={rootCSS.default__button}>{EN ? 'Join the room' : 'Приєднатися до кімнати'}
                        </button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export {HomeFirepadPage};

