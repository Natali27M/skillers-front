import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Helmet} from 'react-helmet-async';

import rootCSS from '../../styles/root.module.css';
import arrow from '../../images/arrow.svg';
import css from './CompilerPage.module.css';
import firepadCss from '../../pages/MainFirepadPage/MainFirepadPage.module.css';
import {compileServices} from '../../services';
import useComponentVisible from '../../RootFunctions/useComponentVisible';
import playArrow from '../../images/play-compiler-green.svg';

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
        setOutput(data);

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
    };

    const title = 'Compiler';
    const description = 'Code compiler with text color according to programming language';
    const url = 'https://skilliant.net/compiler';

    return (
        <div className={css.compiler}>
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

            <div className={rootCSS.root__background}></div>
            <form className={css.compiler__form} onSubmit={handleSubmit(compile)}>
                <CodeEditor
                    value={code}
                    language={highlightLang}
                    placeholder="Please enter code."
                    onChange={(evn) => setCode(evn.target.value)}
                    className={css.compiler__textarea}
                    padding={30}
                    style={{
                        backgroundColor: '#FFF',
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
                <div className={css.result__wrap}>
                    <div className={css.dropdown__wrap} ref={ref}>
                        <div className={css.dropdown__btn} onClick={() => setDropOpen(!dropOpen)}>
                            <div>{language.name}</div>
                            <img className={dropOpen ? css.arrow__open : css.arrow__close} src={arrow}
                                 alt="arrow"/>
                        </div>
                        {dropOpen && <div className={css.drop__elements_wrap}>
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
                    <input
                        type="text"
                        className={firepadCss.compiler__input}
                        {...register('stdin')}
                        placeholder="input"
                    />
                    <div className={firepadCss.result__computer}>
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
                <button className={`${firepadCss.compiler__btn} ${css.compiler__btn}`}>
                    RUN
                    <img src={playArrow} alt="arrow"/>
                </button>
            </form>
        </div>
    );
};

export {CompilerPage};
