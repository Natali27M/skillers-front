import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CodeEditor from '@uiw/react-textarea-code-editor';

import rootCSS from '../../styles/root.module.css'
import arrow from '../../images/arrow.svg';
import css from './CompilerPage.module.css';
import {compileServices} from '../../services';
import useComponentVisible from '../../RootFunctions/useComponentVisible';

const CompilerPage = () => {
    const {register, handleSubmit} = useForm();

    const [output, setOutput] = useState({});

    const [wait, setWait] = useState(false);

    const [language, setLanguage] = useState({id: 54, name: 'C++ (GCC 9.2.0)'});

    const [langArray, setLangArray] = useState([]);

    const [dropOpen, setDropOpen] = useState(false);

    const [highlightLang, setHighlightLang] = useState('cpp');

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

    useEffect(() => {
        compileServices.getLanguages().then(value => setLangArray(value));
    }, []);

    useEffect(() => {
        if (!isComponentVisible) {
            setDropOpen(false);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);


    const makeOutput = (data) => {
        if(language.id === 1){
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

    useEffect(() => {
        if (language?.name.includes('C++')) {
            setHighlightLang('cpp');
        } else if (language?.name.includes('C')) {
            setHighlightLang('c');
        } else if (language?.name.includes('C#')) {
            setHighlightLang('cs');
        } else if (language?.name.includes('JavaScript')) {
            setHighlightLang('js');
        } else if (language?.name.includes('Java')) {
            setHighlightLang('java');
        } else if (language?.name.includes('Python')) {
            setHighlightLang('py');
        } else if (language?.name.includes('TypeScript')) {
            setHighlightLang('ta');
        } else if (language?.name.includes('PHP')) {
            setHighlightLang('php');
        } else {
            setHighlightLang('cpp');
        }
    }, [language]);

    const [code, setCode] = React.useState(
        `#include \<iostream\> \nusing namespace std; \nint main() {\n     int a;\n     cin \>\> a;\n     cout << 1 << endl;\n     return 0; \n}`
    );

    const setLangValue = (lang) => {
        setLanguage(lang);
        setDropOpen(false);
    };

    const compile = async (obj) => {
        setWait(true);
        if(language.id !== 1) {
            compileServices.judgeCompile({
                ...obj,
                source_code: code,
                language_id: language.id
            }).then(result => makeOutput(result));
        } else {
            compileServices.ownCompile({
                ...obj,
                source: code,
                lang: 'CPP'
            }).then(result => makeOutput(result));
        }
    };


    return (
        <div className={css.compiler}>
            <div className={rootCSS.root__background}></div>
            <div className={css.compiler__container}>
                <div className={css.result__phone}>
                    {wait ?
                        <div>Please, wait...</div>
                        :
                        <>
                            {(!(output?.error) && !(output?.status?.id === 6)) && <div>Result:</div>}
                            {(output?.error || (output?.status?.id === 6)) && <div className={css.error}>ERROR</div>}
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
                        onChange={(evn) => setCode(evn.target.value)}
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

                                {language.id !== 1 &&
                                    <div onClick={() => setLangValue({name: 'C++ (custom compiler)', id: 1})}
                                         className={css.dropdown__element}>
                                        C++ (custom compiler)
                                    </div>}
                                {
                                    langArray?.map(lang =>
                                        <div key={lang?.id}>
                                            {lang !== language &&
                                                <div onClick={() => setLangValue(lang)}
                                                     className={css.dropdown__element}>
                                                    {lang?.name}
                                                </div>

                                            }
                                        </div>
                                    )
                                }
                            </div>}
                        </div>
                    </div>
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
    );
};

export {CompilerPage};