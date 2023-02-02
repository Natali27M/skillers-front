import React, {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import qs from "qs";
import {Roller} from "react-awesome-spinners";

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';
import css_post from '../../CommunityQuestion/AskQuestion/AskQuestion.module.css';
import css from './IdeaDetails.module.css';
import user_image from '../../../../images/user.svg';

import {createOpinion, deleteMyIdea, deleteOpinion, getOneIdea} from "../../../../store";
import {docco} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import {ideaOpinionValidator} from "../../../../validation/ideaOpinion.validator";
import {notificationService} from "../../../../services/notification.service";

const IdeaDetails = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {oneIdea, isDeletedIdea} = useSelector(state => state['ideasReducers']);
    const {status, isDeletedOpinion} = useSelector(state => state['discussionReducers']);

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();

    const [loading, setLoading] = useState(false);

    const element = document.getElementById(`${state?.commentId}`);

    if (element) {
        element.scrollIntoView();
    }

    const {handleSubmit, register, formState: {errors}, reset} = useForm({resolver: joiResolver(ideaOpinionValidator)});

    useEffect(() => {
        dispatch(getOneIdea(id));
        if (isDeletedIdea) {
            setLoading(!loading);
            return navigate('/community/idea');
        }
    }, [id, status === 'fulfilled', isDeletedOpinion, isDeletedIdea]);


    const createNotification = async () => {
        const opinion = JSON.parse(localStorage.getItem('opinion'));
        const notification = {
            postId: oneIdea?.id,
            commentId: null,
            idComment: opinion.id,
            postAuthorId: oneIdea.attributes.userId,
            userId: opinion?.attributes?.userId,
            username: opinion?.attributes?.userName,
            isReaded: false,
            isOpened: false,
            url: 'community/idea',
        }
        const {data} = await notificationService.createNotification(notification);
        if (data) {
            return localStorage.removeItem('opinion');
        }
    }

    const myOpinion = async (formData) => {
        const myOpinion = {
            comment: formData?.comment,
            userName: user?.username,
            userId: user?.id,
            idea: oneIdea?.id,
            ideaId: oneIdea?.id,
            code: formData?.code !== '' ? formData.code : null,
        }
        await dispatch(createOpinion(myOpinion));
        await createNotification();
        reset();
    }


    const makeDeleteIdea = () => {
        setLoading(!loading);
        dispatch(deleteMyIdea({id: oneIdea?.id, postId: oneIdea?.attributes?.postId}));
    }

    const makeDeleteOpinion = async (id) => {
        let query = qs.stringify({
            filters: {
                idComment: {
                    $eq: id,
                }
            }
        }, {encodeValuesOnly: true});

        const {data} = await notificationService.getOne(query);
        await notificationService.deleteNotification(data[0].id);
        dispatch(deleteOpinion(id));
    }

    if (!user) {
        return <Navigate to={'/login'} replace/>
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
                            <div>{oneIdea?.attributes?.discussions?.data?.length ? oneIdea?.attributes?.discussions?.data.length : 0}</div>
                        </div>
                    </div>

                    <div className={css.description__block}>
                        <div className={css.section}>
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

                        {oneIdea?.attributes?.code ?
                            <div className={css.section}>
                                <span>
                                    {EN ? "Program code" : "Програмний код"}
                                </span>
                                <div className={css.code}>
                                    <SyntaxHighlighter language="javascript" style={docco} showLineNumbers={true}>
                                        {oneIdea?.attributes?.code}
                                    </SyntaxHighlighter>
                                </div>
                            </div> : <></>
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
                                oneIdea?.attributes?.technologies?.data?.length > 0 && oneIdea?.attributes?.technologies?.data.map(value =>
                                    <div key={value.id} className={css.technology}>
                                        {value.attributes.value}
                                    </div>
                                )
                            }
                        </div>

                        <div className={css.idea_categories}>
                            {
                                oneIdea?.attributes?.categories?.data?.length > 0 && oneIdea?.attributes?.categories?.data.map(value =>
                                    <div key={value.id} className={css.category}>
                                        {value.attributes.value}
                                    </div>
                                )
                            }
                        </div>


                        {user?.id === oneIdea?.attributes?.userId &&
                            <div className={css.delete_idea_block}>
                                <div>
                                    {loading && <Roller/>}
                                </div>
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
                                    oneIdea?.attributes?.discussions?.data?.length > 0 && oneIdea?.attributes?.discussions?.data.map(value =>
                                        <div key={value.id} className={css.opinion_block} id={value.id}>
                                            <div className={css.opinion_user}>
                                                <div className={css.user}>
                                                    <img src={user_image} alt="user"/>
                                                    <div className={css.idea_user_name}>{value?.attributes?.userName}</div>
                                                </div>
                                            </div>
                                            <div className={css.comment}>{value.attributes.comment}</div>
                                            {
                                                value.attributes.code && <div className={css.opinion_code}>
                                                    <SyntaxHighlighter language="javascript" style={docco}
                                                                       showLineNumbers={true}>
                                                        {value?.attributes?.code}
                                                    </SyntaxHighlighter>
                                                </div>
                                            }
                                            {user?.id === value?.attributes?.userId &&
                                                <div className={css.delete_my_opinion}>
                                                    <button
                                                        onClick={() => makeDeleteOpinion(value?.id)}
                                                        className={css.delete_my_opinion_button}
                                                    >
                                                        {EN ? "Delete my opinion" : "Видалити мою думку"}
                                                    </button>
                                                </div>}
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
                                        className={errors.comment && css_post.errorFeld}
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
