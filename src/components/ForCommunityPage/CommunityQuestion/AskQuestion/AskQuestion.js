import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import css_helper from "../Questions/Questions.module.css";
import css from './AskQuestion.module.css';
import {postsServices} from "../../../../services/posts.services";
import {createQuestion} from "../../../../store";

const AskQuestion = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    let {user} = useSelector(state => state['userReducers']);

    const dispatch = useDispatch();
    const {handleSubmit, register, formState: {errors}, reset} = useForm();

    const askQuestion = async (formData) => {
        const question = {
            ...formData,
            userId: user?.id,
            userName: user?.username,
            type: 'question',
        }
        const post = {
            userId: user.id,
            post: question
        }
        console.log('start question')
        await postsServices.createPost({...post});
        console.log('post created')
        dispatch(createQuestion(question));
        console.log('question created');
    }

    return (
        <div className={css_helper.container}>
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
                            </ul>
                        </div>
                        <div>
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
                                {...register('title')}
                            />
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
                                {...register('description')}
                            />
                        </div>
                        <div className={css.form_sub_block}>
                            <h4>Details</h4>
                            <div className={css.input_description}>
                                {EN ? "Details include examples of what you've already tried" :
                                    "Деталі містять пркликлади того, що ви вже пробували зробити"}
                            </div>
                            <textarea
                                placeholder='Details'
                                {...register('details')}
                            />
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
                                {...register('expected_result')}
                            />
                        </div>
                        <div className={css.button_div}>
                            <button
                                className={css_helper.ask__button}>{EN ? "Ask Question" : "Задати запитання"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export {AskQuestion};
