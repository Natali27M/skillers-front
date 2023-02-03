import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import Select from "react-select";
import {Navigate, useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {Roller} from "react-awesome-spinners";
import {Helmet} from "react-helmet-async";

import css_helper from "../Questions/Questions.module.css";
import css from './AskQuestion.module.css';
import {postsServices} from "../../../../services/posts.services";
import {createQuestion, getTechnologies, updateQuestion} from "../../../../store";
import {createQuestionValidator} from "../../../../validation";

const AskQuestion = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm({resolver: joiResolver(createQuestionValidator)});

    const [technology, setTechnology] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getTechnologies())
    }, [])


    const technologiesArray = (array) => {
        let mentorTechnologies = []
        for (const element of array) {
            const find = technologies.data.find(value => value.attributes.value === element.value);
            mentorTechnologies.push(find)
        }
        setTechnology(mentorTechnologies)
    }


    const create = async (question) => {
        return dispatch(createQuestion(question));
    }

    const createQuestionPost = async (myQuestion) => {
        const question = JSON.parse(localStorage.getItem('question'));
        if (question.id) {
            const post = {
                userId: user.id,
                post: {
                    ...myQuestion,
                    id: question.id
                }
            }
            const {data} = await postsServices.createPost({...post});
            dispatch(updateQuestion({id: question.id, postId: data?.id}))
        }
        setLoading(!loading);
        return localStorage.removeItem('question');
    }

    const askQuestion = async (formData) => {
        setLoading(!loading);
        const myQuestion = {
            ...formData,
            userId: user?.id,
            userName: user?.username,
            type: 'question',
            technologies: technology,
        }
        await create(myQuestion);
        await createQuestionPost(myQuestion);

        reset();
        return navigate('/community/question');
    }

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

    const title = 'Create question';
    const description = 'Create question and get answers';
    const url = `https://skilliant.net/community/question/ask`;

    return (
        <div className={css_helper.container}>
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

            <div className={css_helper.questions__container}>
                <div className={css.question__sure__info__block__main}>
                    <div className={css.question__sure__info__block}>
                        <h3>
                            {EN ? "Please keep your questions as informative and concise as possible with examples of what you have already tried" :
                                "Будь ласка, задавайте питання максимально інформативно та коротко з прикладами того, що ви вже спробували"}
                        </h3>
                        <div>
                            <ul>
                                <h4>{EN ? "Follow these steps to write a question:" : "Дотримуйтесь наступних кроків написання запитання:"}</h4>
                                <li>{EN ? "Title - summarize your question" : "Title - узагальніть ваше запитання"}</li>
                                <li>{EN ? "Description - describe your question in detail" : "Description - детально розкрийте ваше запитання "}</li>
                                <li>{EN ? "Details - specify examples of the code you have already written" : "Details - вкажіть приклади коду який ви вже написали "}</li>
                                <li>{EN ? "Expected Result - the result you expect" : "Expected Result - результат який ви очікуєте"}</li>
                                <li>{EN ? "Select technology - mark one about several technologies" : "Select technology - позначте одну обо декілька технологій "}</li>
                            </ul>
                        </div>
                        <div className={css.following}>
                            {EN ? "By following these simple steps, you can easily write an " +
                                "informative question and as a result, it will be easier for " +
                                "users to understand you and give useful advice." :
                                "Дотримуючись цих простих кроків ви з легкістю зможете написати " +
                                "інформативне запитання і як результат користувачам " +
                                "буде легше вас зрозуміти да дати корисні поради"
                            }
                        </div>
                    </div>
                </div>

                <div className={css.form__block__main}>
                    <div
                        className={css.write_you_question}>{EN ? "Write your question" : "Напишіть ваше запитання "}</div>
                    <form onSubmit={handleSubmit(askQuestion)} className={css.form}>
                        <div className={css.form_sub_block}>
                            <h4>Title</h4>
                            <div
                                className={css.input_description}>{EN ? "Be specific and imagine that you are answering the question asked" :
                                "Будьте конкретними та уявіть, що ви відповідаєте на поствлене запитання"}
                            </div>
                            <input
                                type="text"
                                placeholder='Title'
                                className={errors.title && css.errorFeld}
                                {...register('title')}
                            />
                            {errors.title &&
                                <div className={css.error}>
                                    {EN ? "The title can not be a empty" : "Поле Title не може бути пустим"}
                                </div>
                            }
                        </div>
                        <div className={css.form_sub_block}>
                            <h4>Description</h4>
                            <div className={css.input_description}>
                                {EN ? "The description of the question contains the most detailed details of the problem. " +
                                    "The minimum allowable number of characters is 40" :
                                    "Опис питання містить максимально розгорнуті деталі проблеми. " +
                                    "Мінімально допустима кількість символів - 40"}
                            </div>
                            <textarea
                                placeholder='Description'
                                className={errors.description && css.errorFeld}
                                {...register('description')}
                            />
                            {errors.description &&
                                <div className={css.error}>
                                    {EN ? "The minimum allowable number of characters is 40" : "Мінімальна допустима кількість символів – 40"}
                                </div>
                            }
                        </div>
                        <div className={css.form_sub_block}>
                            <h4>Details</h4>
                            <div className={css.input_description}>
                                {EN ? "Details include code examples of what you've already tried" :
                                    "Деталі містять пркликлади коду та того, що ви вже пробували зробити"}
                            </div>
                            <textarea
                                placeholder='Details'
                                className={errors.details && css.errorFeld}
                                {...register('details')}
                            />
                            {errors.details &&
                                <div className={css.error}>
                                    {EN ? "The minimum allowable number of characters is 40" : "Мінімальна допустима кількість символів – 40"}
                                </div>
                            }
                        </div>
                        <div className={css.form_sub_block}>
                            <h4>Expected Result</h4>
                            <div className={css.input_description}>
                                {EN ? "The expected result contains the desired result for you" :
                                    "Очікуваний результат містить бажаний для вас результат"}
                            </div>
                            <input
                                type="text"
                                placeholder='Expected Result'
                                className={errors.expected_result && css.errorFeld}
                                {...register('expected_result')}
                            />
                            {errors.expected_result &&
                                <div className={css.error}>
                                    {EN ? "The expected result can not be a empty" : "Поле expected result не може бути пустим"}
                                </div>
                            }
                        </div>
                        <div className={css.form_sub_block}>
                            <h4>Select technology</h4>
                            <div className={css.input_description}>
                                {EN ? "Mark one about several technologies" :
                                    "Позначте одну обо декілька технологій "}
                            </div>

                            <Select options={technologies?.data?.map(value => value.attributes)}
                                    onChange={technologiesArray}
                                    isMulti
                                    placeholder={EN ? "Technology" : "Виберіть технологію"}
                                    className={css.select__input}/>
                        </div>
                        <div className={css.button_div}>
                            <button
                                className={css_helper.ask__button}>{EN ? "Ask Question" : "Задати запитання"}
                            </button>

                            <div>
                                {loading && <Roller/>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export {AskQuestion};
