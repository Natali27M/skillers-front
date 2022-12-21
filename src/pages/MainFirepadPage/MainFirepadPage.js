import React from 'react'
import {set, ref, onValue, remove} from 'firebase/database';
import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';

import {db} from "../../firebaseConfig";
import css from '../CompilerPage/CompilerPage.module.css';
import {compileServices} from '../../services';
import rootCSS from '../../styles/root.module.css';

function MainFirepadPage() {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const {handleSubmit} = useForm();

    const {register} = useForm();

    const param = useParams();

    const template = param?.template;

    const newTemplate = template.split(' ');

    const path = `${param?.id}-${newTemplate[0]}`;

    let location = useLocation();

    const navigate = useNavigate();

    const [highlightLang, setHighlightLang] = useState('cpp');

    const [output, setOutput] = useState({});

    const [wait, setWait] = useState(false);

    const [language, setLanguage] = useState({id: 54, name: 'C++ (GCC 9.2.0)'});

    const [formState, setFormState] = useState('');

    let teamCoding = localStorage.getItem('teamCoding');

    const [code, setCode] = React.useState(
        `#include \<iostream\> \nusing namespace std; \nint main() {\n     int a;\n     cin \>\> a;\n     cout << 1 << endl;\n     return 0; \n}`
    );

    useEffect(() => {
        setLanguage(location.state)
    },[location.state])

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
                myData = data[`${path}`].code;
                setCode(myData)
            } else {
                setCode(`#include \<iostream\> \nusing namespace std; \nint main() {\n     int a;\n     cin \>\> a;\n     cout << 1 << endl;\n     return 0; \n}`)
            }
        });

    }, []);

    useEffect(() => {
        const handler = (event) => {
            event.preventDefault();
            event.returnValue = "";

        };

        const userId = user?.id
        if (teamCoding && param.id == userId) {
        // if (formState === 'modified' && param.id == user.id) {
            window.addEventListener("beforeunload", handler);
            return () => {
                window.removeEventListener("beforeunload", handler);
                    if (window.confirm("Leave site?")) {
                        remove(ref(db, `/${path}`));
                        localStorage.removeItem('teamCoding');
                    } else {
                        navigate(`${location.pathname}`);
                    }
                }
            }
    }, [formState, user]);

    const handleChange = (evn) => {
        setCode(evn.target.value);

        // write from firebase
        set(ref(db, `/${path}`), {
            code: evn.target.value,
        });

        localStorage.setItem('teamCoding', 'yes');

        if (evn.target.value !== "") {
            setFormState("modified");
        } else {
            setFormState("unchanged");
        }
    }

    return (
        <div>
            <div className={css.compiler}>

                <div className={rootCSS.root__background}></div>

                <div className={css.compiler__wrap}>

                    <h1 className={css.compiler__title}>Online compiler</h1>

                    <div className={css.compiler__container}>

                        <div className={css.result__phone}>
                            {wait ?
                                <div>Please, wait...</div>
                                :
                                <>
                                    {(!(output?.error) && !(output?.status?.id === 6)) && <div>Result:</div>}
                                    {(output?.error || (output?.status?.id === 6)) &&
                                        <div className={css.error}>ERROR</div>}
                                    {output?.stdout && <pre>Output: {output.stdout}</pre>}
                                    {output?.time && <div>Time: {output.time}</div>}
                                    {output?.memory && <div>Memory: {output.memory}</div>}
                                </>
                            }
                        </div>

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

                            <input type="text"
                                   className={css.compiler__input}
                                   {...register('stdin')}
                                   placeholder="input"

                            />

                            <button className={css.compiler__btn}>COMPILE</button>

                        </form>

                        <div className={css.result__wrap}>

                            <div className={css.result__computer}>
                                {wait ?
                                    <div>Please, wait...</div>
                                    :
                                    <>
                                        {(!(output?.error) && !(output?.status?.id === 6)) && <div>Result:</div>}
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
            </div>

            <div>
                <div>
                    {EN ? 'Your colleague can join you using this link : ' : 'Ваш колега може приєдатися до вас за цим посилання :'}
                </div>
                <div>{location?.pathname}</div>
            </div>

        </div>
    );
}

export {MainFirepadPage};


