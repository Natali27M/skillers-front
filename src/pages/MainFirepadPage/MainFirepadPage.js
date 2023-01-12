import React from 'react';
import {ref, onValue, update} from 'firebase/database';
import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Helmet} from 'react-helmet-async';

import {db} from '../../firebaseConfig';
import css from './MainFirepadPage.module.css';
import {compileServices} from '../../services';
import playArrow from '../../images/play-compiler-green.svg';
import rootCSS from '../../styles/root.module.css';

function MainFirepadPage() {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const {handleSubmit} = useForm();

    const {register} = useForm();

    const param = useParams();

    const template = param?.template;

    const idFirebase = param?.idFirebase;

    const newTemplate = template.split('-');

    //  object for compilator
    const myLanguage = {id: newTemplate[1], name: param?.language};

    const path = `${param?.id}-${newTemplate[0]}-${idFirebase}`;

    let location = useLocation();

    const navigate = useNavigate();

    const [highlightLang, setHighlightLang] = useState('');

    const [output, setOutput] = useState({});

    const [wait, setWait] = useState(false);

    const [language, setLanguage] = useState({});

    const [modalForJoin, setModalForJoin] = useState('');

    const [roomUrlCopyTime, setRoomUrlCopyTime] = useState(false);

    const [code, setCode] = useState('');

    let teamCoding = localStorage.getItem('teamCoding');

    useEffect(() => {
        compileServices.getLanguages().then(value => value);
    }, []);

    const makeOutput = (data) => {
        if (language.id === 1) {
            setOutput({
                stdout: data?.result,
                time: data?.time_used,
                memory: data?.memory_used
            });
        } else {
            setOutput(data);
        }
        setWait(false);
    };

    useEffect(() => {
        if (language?.name?.includes('C++')) {
            setHighlightLang('cpp');
        } else if (language?.name?.includes('C')) {
            setHighlightLang('c');
        } else if (language?.name?.includes('C#')) {
            setHighlightLang('cs');
        } else if (language?.name?.includes('JavaScript')) {
            setHighlightLang('js');
        } else if (language?.name?.includes('Java')) {
            setHighlightLang('java');
        } else if (language?.name?.includes('Python')) {
            setHighlightLang('py');
        } else if (language?.name?.includes('TypeScript')) {
            setHighlightLang('ta');
        } else if (language?.name?.includes('PHP')) {
            setHighlightLang('php');
        } else {
            setHighlightLang('cpp');
        }
    }, [language]);

    const compile = async (obj) => {
        setWait(true);
        compileServices.judgeCompile({
            ...obj,
            source_code: code,
            language_id: language?.id
        }).then(result => makeOutput(result));
    };

    useEffect(() => {
        setLanguage(myLanguage);
    }, []);

    const [dbValue, setDbValue] = useState(' ');
    //read from firebase
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();

            let myData;

            if (data) {
                const dataPath = data[`${path}`];
                setDbValue(dataPath);
                const codeDB = dataPath?.code;
                myData = codeDB;

                if (codeDB === ' ') {
                    return setCode('');
                }
                setCode(myData);

            } else {
                setCode('');
                setModalForJoin('leave');
            }
        });

    }, []);

    const handleChange = (evn) => {
        setCode(evn.target.value);
        // update from firebase
        update(ref(db, `/${path}`), {
            code: evn.target.value,
        }).then(r => r);
    };

    const roomUrlCopy = () => {
        setRoomUrlCopyTime(true);
        navigator.clipboard.writeText(window.location.href).then(r => r);
        setTimeout(() => {
            setRoomUrlCopyTime(false);
        }, 1000);
    };

    if (dbValue?.userId && +dbValue?.userId === user?.id) {
        localStorage.setItem('teamCoding', 'yes');
        localStorage.setItem('path', `${path}`);
        localStorage.setItem('pathCoding', `${location.pathname}`);
    }

    if (teamCoding) {
        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            navigate('/team-coding');
        });
    }

    const leaveOk = () => {
        navigate('/team-coding');
    };

    const title = 'Collaborative programming';
    const description = 'A room where multiple people can write code at the same time and everyone can see those changes';
    const url = `https://skilliant.net${location.pathname}`;

    return (
        <div className={css.compiler__main}>
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

            <div className={css.compiler}>

                <div className={css.compiler__wrap}>

                    <div className={css.compiler__container}>

                        <div className={css.result__phone}>
                            {wait ?
                                <div>Please, wait...</div>
                                :
                                <>
                                    {(!(output?.error) && !(output?.status?.id === 6)) && <div>OUTPUT</div>}
                                    {(output?.error || (output?.status?.id === 6)) &&
                                        <div className={css.error}>ERROR</div>}
                                    {output?.stdout && <pre>Output: {output.stdout}</pre>}
                                    {output?.time && <div>Time: {output.time}</div>}
                                    {output?.memory && <div>Memory: {output.memory}</div>}
                                </>
                            }
                        </div>

                        {modalForJoin === 'leave' && <div className={css.reload__main}>
                            <div className={css.reload__modal_block}>
                                {EN ? 'This code has been removed by the owner'
                                    :
                                    'Цей код видалено власником'}

                                <button onClick={leaveOk} className={rootCSS.default__button}>
                                    {EN ? 'Ok' : 'Так'}
                                </button>

                            </div>
                        </div>

                        }

                        <form className={css.compiler__form} onSubmit={handleSubmit(compile)}>

                                <CodeEditor
                                    value={code}
                                    language={highlightLang}
                                    placeholder="Please enter code."
                                    onChange={handleChange}
                                    padding={15}
                                    minHeight={400}
                                    className={css.compiler__textarea}
                                    style={{
                                        fontSize: 14,
                                        backgroundColor: '#FFF',
                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                    }}
                                />

                            <button className={css.compiler__btn}>
                                RUN
                                <img src={playArrow} alt="arrow"/>
                            </button>

                        </form>

                        <div className={css.result__wrap}>

                            <input type="text"
                                   className={css.compiler__input}
                                   {...register('stdin')}
                                   placeholder="INPUT"

                            />

                            <div className={css.result__computer}>
                                {wait ?
                                    <div>Please, wait...</div>
                                    :
                                    <>
                                        {(!(output?.error) && !(output?.status?.id === 6)) && <div>OUTPUT</div>}
                                        {(output?.error || (output?.status?.id === 6)) &&
                                            <div className={css.error}>ERROR</div>}
                                        {output?.stdout && <pre>Output: {output.stdout}</pre>}
                                        {output?.time && <div>Time: {output.time}</div>}
                                        {output?.memory && <div>Memory: {output.memory}</div>}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className={css.main__room_link}>
                    <div className={css.title__room_link}>
                        {EN ? 'Your colleague can join your room using this link : '
                            :
                            'Ваш колега може приєдатися до вашої кімнати за цим посилання :'}
                    </div>

                    <div className={css.copy__room_link}>{window.location.href}

                        <button onClick={() => roomUrlCopy()} className={css.copy__room_btn}>
                            {roomUrlCopyTime ? 'Copied' : 'СOPY'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export {MainFirepadPage};





