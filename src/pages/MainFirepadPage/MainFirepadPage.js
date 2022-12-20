import React from 'react'
import {uid} from "uid";
import {set, ref, onValue, remove, update} from 'firebase/database';
import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';

import {db} from "../../firebaseConfig";
import css from '../CompilerPage/CompilerPage.module.css';
import {compileServices} from '../../services';
import rootCSS from '../../styles/root.module.css';
import arrow from '../../images/arrow.svg';

function MainFirepadPage() {
    const {EN} = useSelector(state => state['languageReducers']);

    const navigate = useNavigate();

    const {user} = useSelector(state => state['userReducers']);

    const {handleSubmit} = useForm();

    const [todo, setTodo] = useState("");

    const [todos, setTodos] = useState([]);
    const [myDate, setMyDate] = useState();

    const {register, setValue} = useForm();

    const param = useParams();

    const template = param?.template;

    const newTemplate = template.split(' ');

    const path = `${param?.id}-${newTemplate[0]}`;

    let location = useLocation();

    const [highlightLang, setHighlightLang] = useState('cpp');
    const [code, setCode] = React.useState(
        `#include \<iostream\> \nusing namespace std; \nint main() {\n     int a;\n     cin \>\> a;\n     cout << 1 << endl;\n     return 0; \n}`
    );

    const writeToDatabase = () => {
        const uuid = uid();

        set(ref(db, `/${path}`), {
            // todo,
            code,
            uuid,
        });

        // setTodo("");
    };


    // useEffect(() => {
    //     setTodo(code);
    //     writeToDatabase();
    // },[code])

    const handleTodoChange = (e) => {
        setTodo(e.target.value);
    };


    useEffect(() => {

        onValue(ref(db), (snapshot) => {
            setTodos([]);

            const data = snapshot.val();

            let myData;

            if (data) {
                myData = data[`${path}`];
                setCode(myData.code)
            }

            // if (!todo) {
            //     setValue('todo', myData?.todo);
            // }

            if (data !== null) {
                setTodos([...todos, data]);
            }
        });

        setTodos('');
    }, []);


    // const deleteFromFirebase = () => {
    //     remove(ref(db, `/${path}`));
    // };


    const [output, setOutput] = useState({});
    const [wait, setWait] = useState(false);
    const [language, setLanguage] = useState({id: 54, name: 'C++ (GCC 9.2.0)'});
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

        // setFormState("saving");
        // saveToApi(newValue).then(() => {
        //     setNewValue("");
        //     setFormState("unchanged");
        // })


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


    function saveToApi(hobby) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(hobby, 'hobby');
                resolve();
            }, 1000);
        });
    }

    // const [newValue, setNewValue] = useState("");
    const [formState, setFormState] = useState('')
    console.log(formState, 'formState');

    useEffect(() => {
        const handler = (event) => {
            event.preventDefault();
            event.returnValue = "";

        };

        if (formState !== "unchanged") {
            // if(formState !== "saving") {
            window.addEventListener("beforeunload", handler);
            // if (formState === 'modified' && window.addEventListener) {
            remove(ref(db, `/${path}`));
            // }
            return () => {
                window.removeEventListener("beforeunload", handler);
                if (formState === 'modified') {
                    if (window.confirm("Leave site?")) {
                        console.log(1);
                        remove(ref(db, `/${path}`));
                    } else {
                        console.log(2);
                        // navigate(`${location.pathname}`);
                    }
                }
            };
            // }
        }
        return () => {};
    }, [formState]);

    const handleChange = (evn) => {
        setCode(evn.target.value);

        if (evn.target.value !== "") {
            setFormState("modified");
        } else {
            setFormState("unchanged");
        }
        // setNewValue(evn.target.value);
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
                                // value={myDate}
                                value={code}
                                language={highlightLang}
                                placeholder="Please enter code."
                                // onChange={handleTodoChange}
                                onChange={handleChange}
                                onBlur={writeToDatabase}
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
                            {/*<button className={css.compiler__btn} disabled={formState === "saving"}>COMPILE</button>*/}
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
                <input type="textarea" {...register('todo', {
                    onChange: handleTodoChange,
                    onBlur: writeToDatabase,
                })}/>
            </div>

            <div>
                <div>
                    {EN ? 'Your colleague can join you using this link : ' : 'Ваш колега може приєдатися до вас за цим посилання :'}
                </div>
                <div>{location?.pathname}</div>
            </div>

            {/*<button onClick={deleteFromFirebase}>{EN ? 'Finish encoding' : 'Завершити кодування'}</button>*/}

        </div>
    );
}

export {MainFirepadPage};


