import React from 'react'
import {set, ref, onValue, remove} from 'firebase/database';
import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';

import {db} from "../../firebaseConfig";
import css from './MainFirepadPage.module.css';
import {compileServices} from '../../services';
import playArrow from '../../images/play-compiler-green.svg';
import rootCSS from '../../styles/root.module.css';

function MainFirepadPage() {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const userId = user?.id

    const {handleSubmit} = useForm();

    const {register} = useForm();

    const param = useParams();

    const template = param?.template;

    const newTemplate = template.split(' ');

    const path = `${param?.id}-${newTemplate[0]}`;

    let location = useLocation();

    const navigate = useNavigate();

    const [highlightLang, setHighlightLang] = useState('');

    const [output, setOutput] = useState({});

    const [wait, setWait] = useState(false);

    const [language, setLanguage] = useState({});

    let teamCoding = localStorage.getItem('teamCoding');

    const [modal, setModal] = useState('');

    const [roomLinkCopyTime, setRoomLinkCopyTime] = useState(false);

    const [code, setCode] = useState('');

    useEffect(() => {
        setLanguage(location.state)
    }, [location.state])

    const makeOutput = (data) => {
        if (language.id === 1) {
            setOutput({
                stdout: data?.result,
                time: data?.time_used,
                memory: data?.memory_used
            })
        } else {
            setOutput(data);
        }
        setWait(false);
    };

    const compile = async (obj) => {
        setWait(true);

        if (language.id !== 1) {
            compileServices.judgeCompile({
                ...obj,
                source_code: code,
                language_id: language.id
            }).then(result => makeOutput(result));
        } else {
            compileServices.ownCompile({
                input: obj.stdin,
                source: code,
                lang: 'CPP'
            }).then(result => makeOutput(result));
        }
    }

    useEffect(() => {
        if (newTemplate?.includes('C++')) {
            setHighlightLang('cpp');
        } else if (newTemplate?.includes('C')) {
            setHighlightLang('c');
        } else if (newTemplate?.includes('C#')) {
            setHighlightLang('cs');
        } else if (newTemplate?.includes('JavaScript')) {
            setHighlightLang('js');
        } else if (newTemplate?.includes('Java')) {
            setHighlightLang('java');
        } else if (newTemplate?.includes('Python')) {
            setHighlightLang('py');
        } else if (newTemplate?.includes('TypeScript')) {
            setHighlightLang('ta');
        } else if (newTemplate?.includes('PHP')) {
            setHighlightLang('php');
        } else {
            setHighlightLang('cpp');
        }
    }, [newTemplate]);

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();

            let myData;

            if (data) {
                const dataPath = data[`${path}`];
                myData = dataPath?.code;
                setCode(myData)
            } else {
                setCode('');
            }
        });

    }, []);

    const handleChange = (evn) => {
        setCode(evn.target.value);

        // write from firebase
        set(ref(db, `/${path}`), {
            code: evn.target.value,
        });

        if (param.id == userId) {
            localStorage.setItem('teamCoding', 'yes');
            localStorage.setItem('path', `${path}`);
            localStorage.setItem('pathCoding', `${location.pathname}`);
        }
    }

    const roomLinkCopy = () => {
        setRoomLinkCopyTime(true);
        navigator.clipboard.writeText(`${location?.pathname}`);
        setTimeout(() => {
            setRoomLinkCopyTime(false);
        }, 1000);

    };

    if (teamCoding) {
        window.history.pushState(null, null, null);

        window.addEventListener("popstate", (e) => {
            e.preventDefault();
            setModal('leave')
        });

        window.addEventListener("load", (e) => {
            e.preventDefault();
            setModal('reload')
            window.history.pushState(null, null, null);
        });
    }

    const changeReloadOk = () => {
        setModal('');
        setCode('');
        navigate(`${location.pathname}`);
        remove(ref(db, `/${path}`));
        localStorage.removeItem('teamCoding');
        localStorage.removeItem('pathCoding');
    }

    const changeReloadCancel = () => {
        setModal('');
        navigate(`${location.pathname}`);
    }

    const changeLeaveOk = () => {
        setModal('');
        setCode('');
        remove(ref(db, `/${path}`));
        localStorage.removeItem('teamCoding');
        localStorage.removeItem('pathCoding');
        navigate('/team-coding');
    }

    const changeLeaveCansel = () => {
        setModal('');
        navigate(`${location.pathname}`);
    }

    return (
        <div className={css.compiler__main}>

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

                        {teamCoding && modal === 'leave' && <div className={css.leave__main}>
                            <div className={css.leave__modal_block}>
                                {EN ? 'Are you sure you want to leave the page?'
                                    :
                                    'Ви впевнені, що бажаєте покинути сторінку?'}

                                <p className={css.leave__modal_block_text}>
                                    {EN ? 'This action will remove the code'
                                        :
                                        'Ця дія приведе до видалення коду'}
                                </p>

                                <div className={css.modal__box_btn}>
                                    <button onClick={changeLeaveOk} className={rootCSS.default__button}>
                                        {EN ? 'Ok' : 'Так'}
                                    </button>

                                    <button onClick={changeLeaveCansel} className={rootCSS.default__button}>
                                        {EN ? 'Cansel' : 'Відмінити'}
                                    </button>
                                </div>

                            </div>
                        </div>}

                        {teamCoding && modal === 'reload' && <div className={css.reload__main}>
                            <div className={css.reload__modal_block}>
                                {EN ? 'Are you sure you want to reload the page?'
                                    :
                                    'Ви впевнені, що бажаєте оновити сторінку?'}

                                <p className={css.leave__modal_block_text}>
                                    {EN ? 'This action will delete all your previous actions'
                                        :
                                        'Ця дія приведе до видалення всіх ваших попередніх дій'}
                                </p>

                                <div className={css.modal__box_btn}>
                                    <button onClick={changeReloadOk} className={rootCSS.default__button}>
                                        {EN ? 'Ok' : 'Так'}
                                    </button>

                                    <button onClick={changeReloadCancel} className={rootCSS.default__button}>
                                        {EN ? 'Cansel' : 'Відмінити'}
                                    </button>
                                </div>

                            </div>
                        </div>}

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
                        {EN ? 'Your colleague can join you using this link : '
                            :
                            'Ваш колега може приєдатися до вас за цим посилання :'}
                    </div>

                    <div className={css.copy__room_link}>{location?.pathname}

                        <button onClick={() => roomLinkCopy()} className={css.copy__room_btn}>
                            {roomLinkCopyTime ? 'Copied' : 'СOPY'}
                        </button>

                    </div>

                </div>


            </div>
        </div>
    );
}

export {MainFirepadPage};



