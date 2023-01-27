import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';
import css_post from '../../CommunityQuestion/AskQuestion/AskQuestion.module.css';
import css from './IdeaDetails.module.css';
import user_image from '../../../../images/user.svg';

import {createOpinion, deleteMyIdea, getOneIdea} from "../../../../store";
import {docco} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";

const IdeaDetails = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {oneIdea} = useSelector(state => state['ideasReducers']);
    const {status} = useSelector(state => state['discussionReducers']);

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {handleSubmit, register, formState: {errors}, reset} = useForm();

    useEffect(() => {
        if (!user) {
            return navigate('/login');
        }
        dispatch(getOneIdea(id));
    }, [id, status === 'fulfilled'])


    const myOpinion = (formData) => {
        const myOpinion = {
            ...formData,
            userName: user?.username,
            userId: user?.id,
            idea: oneIdea?.id,
            code: formData?.code !== '' ? formData.code : null,
        }
        dispatch(createOpinion(myOpinion));
        reset();
    }


    const makeDeleteIdea = async () => {
        await dispatch(deleteMyIdea(oneIdea?.id))
        return navigate('/community/idea')
    }

    return (
        <div className={css_helper.container}>
            <div className={css_helper.questions__container}>
                <div className={css.idea_details_container}>

                    <div className={css.title__block}>
                        <div className={css.idea_title}>
                            {oneIdea?.attributes?.title}
                        </div>
                        <div>
                            <button className={css_helper.ask__button}
                                    onClick={() => navigate('/community/idea/post')}>{EN ? "Share idea" : "Поширити ідею"}
                            </button>
                        </div>
                    </div>

                    <div className={css.info__block}>
                        <div className={css.user}>
                            <img src={user_image} alt="user"/>
                            <div className={css.idea_user_name}>{oneIdea?.attributes?.userName}</div>
                        </div>
                        <div className={css.asked}>
                            <span>{EN ? "Common: " : "Поширена: "}</span>
                            <div>{(oneIdea?.attributes?.publishedAt)?.split('T')[0]}</div>
                        </div>
                        <div className={css.asked}>
                            <span>{EN ? "The number of responses to the idea: " : "Кількість відгуків на ідею: "}</span>
                            <div>{oneIdea?.attributes?.discussions?.data?.length ? oneIdea?.attributes?.answers?.discussions?.length : 0}</div>
                        </div>
                    </div>

                    <div className={css.description__block}>
                        <div className={css.section}>
                            {/*<span>*/}
                            {/*    {EN ? "Brief description of the idea" : "Короткий опис ідеї"}*/}
                            {/*</span>*/}
                            <div>
                                {oneIdea?.attributes?.description}
                            </div>
                        </div>


                        <div className={css.section}>
                            <span>
                                {EN ? "Deepening the topic" : "Поглиблення в тему"}
                            </span>
                            <div className={css.details}>
                                {oneIdea?.attributes?.details}
                            </div>
                        </div>

                        {oneIdea?.attributes?.code &&
                            <div className={css.section}>
                                <span>
                                    {EN ? "Program code" : "Програмний код"}
                                </span>
                                <div className={css.code}>
                                    <SyntaxHighlighter language="javascript" style={docco} showLineNumbers={true}>
                                        {oneIdea?.attributes?.code}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        }

                        <div className={css.section}>
                                <span>
                                    {EN ? "Conclusion" : "Заключення"}
                                </span>
                            <div className={css.details}>
                                {oneIdea?.attributes?.conclusion}
                            </div>
                        </div>

                        <div className={css.idea_technologies}>
                            {
                                oneIdea?.attributes?.technologies?.data?.length && oneIdea?.attributes?.technologies?.data.map(value =>
                                    <div key={value.id} className={css.technology}>
                                        {value.attributes.value}
                                    </div>
                                )
                            }
                        </div>

                        <div className={css.idea_categories}>
                            {
                                oneIdea?.attributes?.categories?.data?.length && oneIdea?.attributes?.categories?.data.map(value =>
                                    <div key={value.id} className={css.category}>
                                        {value.attributes.value}
                                    </div>
                                )
                            }
                        </div>


                        {user?.id === oneIdea?.attributes?.userId &&
                            <div className={css.delete_idea_block}>
                                <button
                                    onClick={() => makeDeleteIdea()}
                                    className={css_helper.ask__button}
                                >
                                    {EN ? "Delete my idea" : "Видалити мою ідею"}
                                </button>
                            </div>
                        }


                        <div className={css.discussions__block}>
                            <h4>{EN ? "How do you like this idea?" : "Як вам така ідея?"}</h4>

                            <>
                                {
                                    oneIdea?.attributes?.discussions?.length > 0 && oneIdea?.attributes?.discussions.map(value =>
                                        <div>

                                        </div>
                                    )
                                }
                            </>
                        </div>

                        <div className={css.form__block}>
                            <form onSubmit={handleSubmit(myOpinion)} className={css_post.form}>
                                <div className={css_post.form_sub_block}>
                                    <h4>Comment</h4>
                                    <div className={css_post.input_description}>
                                        {EN ? "Leave your opinion about this idea" :
                                            "Залиште вашу думку про дану ідею"}
                                    </div>
                                    <textarea
                                        placeholder='Comment'
                                        className={errors.details && css_post.errorFeld}
                                        {...register('comment')}
                                    />
                                    {errors.comment &&
                                        <div className={css_post.error}>
                                            {EN ? "The minimum allowable number of characters is 40" : "Мінімальна допустима кількість символів – 40"}
                                        </div>
                                    }
                                </div>

                                <div className={css_post.form_sub_block}>
                                    <h4>Code</h4>
                                    <div className={css_post.input_description}>
                                        {EN ? "If it's a technical idea, you can share a code snippet, but this field is optional" :
                                            "Якщо це технічна ідея можете поширити фрагмент коду, але це поле не є обов'язковим"}
                                    </div>
                                    <textarea
                                        placeholder='Code'
                                        {...register('code')}
                                    />
                                </div>

                                <div className={css_post.button_div}>
                                    <button
                                        className={css_helper.ask__button}>{EN ? "Leve my opinion" : "Поширити мою думку"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {IdeaDetails};
