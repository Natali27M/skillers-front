import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';

import css from './Post.module.css';
import {
    createComment,
    createNotification, deleteComment, deleteNotification, deletePost,
    getPostById
} from '../../../../store';
import {Comment} from '../Comment/Comment';
import achievement from '../../../../images/community/achievement.svg';
import question from '../../../../images/community/question.svg';
import ideaPost from '../../../../images/community/idea.svg';
import questionImg from '../../../../images/community/questionImg.svg';
import ideaImg from '../../../../images/community/ideaImg.svg';
import message from '../../../../images/community/message.svg';
import results from '../../../../images/community/results.svg';
// import results from '../../../../images/community/winner.svg';
import threePoint from '../../../../images/community/three-point.svg';
import avatar from '../../../../images/avatar.jpg';
import {notificationsServices} from '../../../../services';
import rootCSS from '../../../../styles/root.module.css';
import cssMainFirepadPage from '../../../../pages/MainFirepadPage/MainFirepadPage.module.css';

const Post = ({post}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {userRank} = useSelector(state => state['achievementsReducers']);
    const [sendComment, setSendComment] = useState(false);
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState("");
    const {handleSubmit, reset} = useForm();
    const textAreaRef = useRef(null);
    const comments = post.attributes.comments.data;
    const createdAt = post.attributes.createdAt.split('T');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const postId = post.id;

    const wantComment = () => {
        if (!sendComment) {
            setSendComment(true);
        } else {
            setSendComment(false);
            setValue('');
        }
    };

    const useAutosizeTextArea = (textAreaRef, value) => {
        useEffect(() => {
            if (textAreaRef) {
                // We need to reset the height momentarily to get the correct scrollHeight for the textarea
                textAreaRef.style.height = "0px";
                const scrollHeight = textAreaRef.scrollHeight;

                // We then set the height directly, outside of the render loop
                // Trying to set this with state or a ref will product an incorrect value.
                textAreaRef.style.height = scrollHeight + "px";
            }
        }, [textAreaRef, value]);
    };

    useAutosizeTextArea(textAreaRef.current, value);

    const handleChange = (evt) => {
        const val = evt.target?.value;
        setValue(val);
    };

    const makeComment = async () => {
        const comment = {
            postId: postId,
            comment: value,
            userId: user.id,
            username: user.username,
            notification: false,
            postAuthorId: post.attributes.userId,
            idPost: postId
        };
        await dispatch(createComment(comment));
        createNotifications();
        reset();
        setValue('');
        setSendComment(false);
        dispatch(getPostById({postId}));
    };

    const createNotifications = async () => {
        const comment = JSON.parse(localStorage.getItem('comment'));

        if (comment.id) {
            const notification = {
                postId: comment.attributes.idPost,
                commentId: comment.id,
                idComment: comment.id,
                postAuthorId: comment.attributes.postAuthorId,
                userId: user.id,
                username: user.username,
                isReaded: false,
                isOpened: false
            };
            dispatch(createNotification(notification));
        }
        return localStorage.removeItem('comment');
    }

    const newComments = comments.map(value => value);
    const reverseComments = newComments.reverse();

    const modalDelete = () => {
        setModal(!modal);
    }

    const deleteOk = async () => {
        if (post.attributes.comments.data.length) {
            for (const element of post.attributes.comments.data) {
                const {data} = await notificationsServices.filterNotificationByCommentId(element.id);
                dispatch(deleteNotification(data[0].id));
                dispatch(deleteComment(element.id));
                dispatch(deletePost(post.id));
                setModal(!modal);
            }
        } else {
            dispatch(deletePost(post.id));
            setModal(!modal);
        }
    }

    const deleteCansel = () => {
        setModal(!modal);
        navigate(`${pathname}`);
    }

    return (
        <div className={css.post__main}>
            <div className={css.post__block}>
                {post.attributes.post.type === 'achievement' &&

                    post.attributes.userId === user.id &&
                    <div className={css.delete__btn} onClick={modalDelete}>
                        <img src={threePoint} alt="delete"/>
                    </div>
                }

                {post.attributes.post.type === 'idea' &&

                    post.attributes.userId === user.id &&
                    <div className={css.delete__btn} onClick={modalDelete}>
                        <img src={threePoint} alt="delete"/>
                    </div>
                }

                {modal && <div className={cssMainFirepadPage.leave__main}>
                    <div className={cssMainFirepadPage.leave__modal_block}>
                        {EN ? 'Delete?' : 'Видалити?'}

                        <div className={cssMainFirepadPage.modal__box_btn}>
                            <button onClick={deleteOk} className={rootCSS.default__button}>
                                {EN ? 'Ok' : 'Так'}
                            </button>

                            <button onClick={deleteCansel} className={rootCSS.default__button}>
                                {EN ? 'Cancel' : 'Відмінити'}
                            </button>
                        </div>

                    </div>
                </div>}

                <div onClick={() => navigate(`/post/${postId}`)}>
                    <div className={css.post__header}>
                        <div className={css.post__header_right}>
                            <img src={avatar} alt="user" className={css.post__user}/>
                            <div className={css.post__block_header}>
                                {post.attributes.post.type === 'achievement' &&
                                    <div className={css.post__username}>{post.attributes.post.username}</div>
                                }

                                {post.attributes.post.type === 'question' &&
                                    <div className={css.post__username}>{post.attributes.post.userName}</div>
                                }

                                {post.attributes.post.type === 'idea' &&
                                    <div className={css.post__username}>{post.attributes.post.userName}</div>
                                }

                                <div className={css.post__userRank}>{userRank}</div>

                                <div className={css.post__createdAt}>{createdAt[0]}</div>
                            </div>
                        </div>

                        <div className={css.post__type}>
                            {post.attributes.post.type === 'achievement' &&
                                <img src={achievement} alt="achievement"/>
                            }

                            {post.attributes.post.type === 'question' &&
                                <img src={question} alt="question"/>
                            }

                            {post.attributes.post.type === 'idea' &&
                                <img src={ideaPost} alt="idea"/>
                            }
                        </div>
                    </div>

                    {post.attributes.post.type === 'achievement' &&
                        <div>
                            <div>
                                I passed the test {post.attributes.post.testName} on
                                technology {post.attributes.post.techName}
                            </div>

                            <div>
                                Test difficulty {post.attributes.post.difficult}.
                                I gave {post.attributes.post.allExercises} correct answers
                                of {post.attributes.post.allExercises}
                            </div>
                            <div className={css.post__img_main}>
                                <img src={results} alt="results"/>
                            </div>
                        </div>
                    }

                    {post.attributes.post.type === 'question' &&
                        <div>
                            <div>{post.attributes.post.title}</div>
                            <div>{post.attributes.post.description}</div>
                            <div className={css.post__img_main}>
                                <img src={questionImg} alt="results"/>
                            </div>
                        </div>
                    }

                    {post.attributes.post.type === 'idea' &&
                        <div>
                            <div>{post.attributes.post.title}</div>
                            <div>{post.attributes.post.description}</div>
                            <div className={css.post__img_main}>
                                <img src={ideaImg} alt="results"/>
                            </div>
                        </div>
                    }
                </div>

                <div className={css.post__block_footer}>
                    <div onClick={wantComment} className={css.post__message}>
                        <div>
                            {reverseComments.length} {EN ? 'Comments' : 'Коментарів'}
                        </div>
                        <img src={message} alt="comment"/>
                    </div>
                </div>

                {sendComment &&
                    <div>
                        <form onSubmit={handleSubmit(makeComment)} className={css.post__createComment_form}>
                        <textarea
                            className={css.post__createComment_input}
                            onChange={handleChange}
                            ref={textAreaRef}
                            rows={1}
                            value={value}
                        />
                            <button className={css.post__createComment_send}></button>

                        </form>

                        {reverseComments.length > 0 &&
                            <Comment key={value.id} comment={reverseComments[0]}
                                     comments={reverseComments}/>
                        }
                    </div>
                }
            </div>
            {/*}*/}

            {/*{post.attributes.post.type === 'question' &&*/}
            {/*    <div className={css.post__block}>*/}
            {/*        <div className={css.post__block_header}>*/}
            {/*            <div className={css.post__block_header_left}>*/}
            {/*                <img src={avatar} alt="user" className={css.post__user}/>*/}
            {/*                <img src={questionColor} alt="question" className={css.post__question}/>*/}
            {/*                <div className={css.post__username}>{post.attributes.post.userName}</div>*/}
            {/*            </div>*/}
            {/*            <div className={css.post__createdAt}>{createdAt[0]}</div>*/}
            {/*        </div>*/}

            {/*        <div className={css.question_title}>{post.attributes.post.title}</div>*/}

            {/*        <div>{post.attributes.post.description}</div>*/}

            {/*        {post.attributes.post.details &&*/}
            {/*            <SyntaxHighlighter className={css.comment__block_box}>*/}
            {/*                {post.attributes.post.details}*/}
            {/*            </SyntaxHighlighter>*/}
            {/*        }*/}

            {/*        <div className={css.post__block_footer}>*/}
            {/*            <div onClick={() => navigate(`/community/question/${post.attributes.post.id}`)}*/}
            {/*                 className={css.post__message_question}>*/}
            {/*                <div>{EN ? 'Go to discussion' : 'Перейти до обговорення'}</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*}*/}

            {/*{post.attributes.post.type === 'idea' &&*/}
            {/*    <div className={css.post__block}>*/}
            {/*        <div className={css.post__block_header}>*/}
            {/*            <div className={css.post__block_header_left}>*/}
            {/*                <img src={avatar} alt="user" className={css.post__user}/>*/}
            {/*                <div className={css.post__info_user}>*/}
            {/*                    <div className={css.post__username}>{post.attributes.post.userName}</div>*/}
            {/*                    <div className={css.post__createdAt}>{createdAt[0]}</div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <img src={questionColor} alt="question" className={css.post__question}/>*/}
            {/*        </div>*/}

            {/*        <div className={css.question_title}>{post.attributes.post.title}</div>*/}

            {/*        <div>{post.attributes.post.description}</div>*/}

            {/*        /!*{post.attributes.post.details &&*!/*/}
            {/*        /!*    <SyntaxHighlighter className={css.comment__block_box}>*!/*/}
            {/*        /!*        {post.attributes.post.details}*!/*/}
            {/*        /!*    </SyntaxHighlighter>*!/*/}
            {/*        /!*}*!/*/}

            {/*        <div className={css.post__block_footer}>*/}
            {/*            <div onClick={() => navigate(`/community/idea/${post.attributes.post.id}`)}*/}
            {/*                 className={css.post__message_question}>*/}
            {/*                <div>{EN ? 'Go to discussion' : 'Перейти до обговорення'}</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*}*/}

        </div>
    );
};

export {Post};
