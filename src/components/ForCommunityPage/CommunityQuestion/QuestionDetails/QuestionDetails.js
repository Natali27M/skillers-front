import React, {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import qs from "qs";
import {Roller} from "react-awesome-spinners";
import {Helmet} from "react-helmet-async";

import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';

import css_helper from "../Questions/Questions.module.css";
import css from './QuestionDetails.module.css';
import {createAnswer, deleteAnswer, deleteQuestion, getOneQuestion} from "../../../../store";
import user_image from '../../../../images/user.svg';
import {answerQuestionValidator} from "../../../../validation";
import {notificationService} from "../../../../services/notification.service";

const QuestionDetails = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {oneQuestion, isDeleteQuestion} = useSelector(state => state['questionsReducers']);
    const {status, isDeletedAnswer} = useSelector(state => state['answersReducers']);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const {state} = useLocation();

    const [loading, setLoading] = useState(false);

    const element = document.getElementById(`${state?.commentId}`);

    if (element) {
        element.scrollIntoView();
    }

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm({resolver: joiResolver(answerQuestionValidator)});


    useEffect(() => {
        if (isDeleteQuestion) {
            setLoading(!loading);
            return navigate('/community/question');
        }

        dispatch(getOneQuestion(Number(id)));
    }, [id, status === 'fulfilled', isDeletedAnswer, isDeleteQuestion]);

    const createNotification = async () => {
        const answer = JSON.parse(localStorage.getItem('answer'));
        const notification = {
            postId: oneQuestion?.id,
            commentId: null,
            idComment: answer?.id,
            postAuthorId: oneQuestion?.attributes?.userId,
            userId: answer?.attributes?.userId,
            username: answer?.attributes?.userName,
            isReaded: false,
            isOpened: false,
            url: 'community/question',
        }
        const {data} = await notificationService.createNotification(notification);
        if (data) {
            return localStorage.removeItem('answer');
        }
    }


    const createMyAnswer = async (answer) => {
        const myAnswer = {
            ...answer,
            question: oneQuestion?.id,
            userId: user?.id,
            userName: user?.username,
            questionId: oneQuestion?.id,
        }
        await dispatch(createAnswer(myAnswer));
        await createNotification();
        reset();
    }

    const makeDeleteQuestion = () => {
        setLoading(!loading);
        dispatch(deleteQuestion({id: oneQuestion?.id, postId: oneQuestion?.attributes?.postId}));
    }

    const makeDeleteAnswer = async (id) => {
        let query = qs.stringify({
            filters: {
                idComment: {
                    $eq: id,
                }
            }
        }, {encodeValuesOnly: true});

        const {data} = await notificationService.getOne(query);
        await notificationService.deleteNotification(data[0].id);
        dispatch(deleteAnswer(id));
    }

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

    const title = 'Read question details';
    const description = 'Read question details and leave you answer';
    const url = `https://skilliant.net/community/question/${oneQuestion?.id}`;

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
                <div className={css.question_details_block}>
                    <div className={css.title__block}>
                        <div className={css.question_title}>
                            {oneQuestion?.attributes?.title}
                        </div>
                        <div>
                            <button className={css_helper.ask__button}
                                    onClick={() => navigate('/community/question/ask')}>{EN ? "Ask question" : "Задати запитання"}
                            </button>
                        </div>
                    </div>

                    <div className={css.info__block}>
                        <div className={css.user}>
                            <img src={user_image} alt="user"/>
                            <div className={css.question_user_name}>{oneQuestion?.attributes?.userName}</div>
                        </div>
                        <div className={css.asked}>
                            <span>{EN ? "Asked: " : "Запитано: "}</span>
                            <div>{(oneQuestion?.attributes?.publishedAt)?.split('T')[0]}</div>
                        </div>
                        <div className={css.asked}>
                            <span>{EN ? "Answers: " : "Відподі: "}</span>
                            <div>{oneQuestion?.attributes?.answers?.data ? oneQuestion?.attributes?.answers?.data?.length : 0}</div>
                        </div>
                    </div>

                    <div className={css.description__block}>
                        <div className={css.question_description}>
                            {oneQuestion?.attributes?.description}
                        </div>

                        {oneQuestion?.attributes?.details &&
                            <div className={css.question_details}>
                                <SyntaxHighlighter language="javascript" style={docco} showLineNumbers={true}>
                                    {oneQuestion?.attributes?.details}
                                </SyntaxHighlighter>
                            </div>
                        }

                        <div className={css.question_expected_result}>
                            {oneQuestion?.attributes?.expected_result}
                        </div>

                        <div className={css.question_technologies}>
                            {
                                oneQuestion?.attributes?.technologies?.data?.length && oneQuestion?.attributes?.technologies?.data?.map(value =>
                                    <div key={value.id} className={css.technology}>
                                        {value.attributes.value}
                                    </div>
                                )
                            }
                        </div>

                        {user?.id === oneQuestion?.attributes?.userId &&
                            <div className={css.delete_question_block}>
                                <div>
                                    {loading && <Roller/>}
                                </div>
                                <button
                                    onClick={() => makeDeleteQuestion()}
                                    className={css_helper.ask__button}
                                >
                                    {EN ? "Delete my question" : "Видалити моє запитання"}
                                </button>
                            </div>
                        }

                    </div>

                    <div className={css.answers__block}>
                        {
                            oneQuestion?.attributes?.answers?.data && oneQuestion?.attributes?.answers?.data?.length ?
                                <div className={css.answers}>
                                    <span>{EN ? "Answers" : "Відповіді"}</span>
                                    <div>
                                        {
                                            oneQuestion?.attributes?.answers?.data?.map(value =>
                                                <div className={css.answer__one__block} key={value.id} id={value.id}>
                                                    <div className={css.user}>
                                                        <img src={user_image} alt="user"/>
                                                        <div
                                                            className={css.question_user_name}>{value?.attributes?.userName} {EN ? " answered" : " відповів"}</div>
                                                    </div>
                                                    <div className={css.answer__text}>{value.attributes.answer}</div>
                                                    {value?.attributes?.code &&
                                                        <div className={css.answer__code}>
                                                            <SyntaxHighlighter language="javascript" style={docco}
                                                                               showLineNumbers={true}>
                                                                {value?.attributes?.code}
                                                            </SyntaxHighlighter>
                                                        </div>
                                                    }

                                                    {user?.id === value?.attributes?.userId &&
                                                        <div className={css.delete_question_block}>
                                                            <button
                                                                className={css.delete_question_button}
                                                                onClick={() => makeDeleteAnswer(value.id)}
                                                            >
                                                                {EN ? "Delete my answer" : "Видалити мою відповідь"}
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div> :
                                <div className={css.answers}>
                                    <span>{EN ? "Be the first to answer" : "Відповідайте першими"}</span>
                                </div>
                        }
                    </div>

                    <div className={css.form__block}>
                        <form onSubmit={handleSubmit(createMyAnswer)} className={css.form}>
                            <div className={css.form_sub_block}>
                                <h4>{EN ? "Your answer" : "Ваша відповідь"}</h4>
                                <div className={css.input_description}>
                                    {EN ? "Give a clear and understandable answer and, if desired, explain in detail the solution to the problem" :
                                        "Давайте чітку та зрозумілу відповідь та за бажанням детально роз'ясніть вирішення проблеми"}
                                </div>
                                <textarea
                                    placeholder='Your answer...'
                                    className={errors.answer && css.errorBorder}
                                    {...register('answer')}
                                />
                                {errors.answer &&
                                    <div className={css.errors}>
                                        {EN ? "Feld answer can not be empty" : "Поле answer не може бути пустим"}
                                    </div>
                                }
                            </div>

                            <div className={css.form_sub_block}>
                                <h4>{EN ? "Please provide code examples to help solve the problem" :
                                    "Введіть приклади коду, які допоможуть вирішити проблему"}
                                </h4>
                                <div className={css.input_description}>
                                    {EN ? "Code examples always expand the answer in more detail and help you understand what the problem was" :
                                        "Приклади коду завжди більш детально розгортають відповідь та допомагають зрозуміти в чому полягала суть проблеми"}
                                </div>
                                <textarea
                                    placeholder='Code...'
                                    {...register('code')}
                                />
                            </div>

                            <div className={css.button_div}>
                                <button
                                    className={css_helper.ask__button}>{EN ? "Answer" : "Відповісти"}</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export {QuestionDetails};
