import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';

import css from '../../ForCommunityPage/CommunityMain/Post/Post.module.css';
// import questionColor from '../../../images/community/questionColor.svg';
import message from '../../../images/community/message.svg';
// import results from '../../../images/community/results.svg';
import results from '../../../images/community/winner.svg';
import {
    createComment,
    createNotification, deleteComment, deleteNotification, deletePost,
    getPostById,
} from '../../../store';
import {CommentDetails} from '../CommentDetails/CommentDetails';
import cssMainFirepadPage from '../../../pages/MainFirepadPage/MainFirepadPage.module.css';
import rootCSS from '../../../styles/root.module.css';
import {notificationsServices} from '../../../services';

const PostDetails = ({post}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {status} = useSelector(state => state['commentReducers']);
    const [sendComment, setSendComment] = useState(false);
    const [modal, setModal] = useState(false);
    const {handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const comments = post.attributes.comments.data;
    const createdAt = post.attributes.createdAt.split('T');
    const navigate = useNavigate();
    const postId = post.id;

    const wantComment = () => {
        if (!sendComment) {
            setSendComment(true);
        } else {
            setSendComment(false);
            setValue('');
        }
    };

    const [value, setValue] = useState("");
    const textAreaRef = useRef(null);

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
            postId: post.id,
            idPost: post.id,
            comment: value,
            userId: user.id,
            username: user.username,
            notification: false,
            postAuthorId: post.attributes.userId
        }
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
                userId: user.id,
                username: user.username,
                isReaded: false,
                isOpened: false,
                postAuthorId: user.id
            };
            dispatch(createNotification(notification));
        }

        return localStorage.removeItem('comment');
    }

    useEffect(() => {
    }, [comments.length, status === 'fulfilled']);

    const newComments = comments.map(value => value);
    const reverseComments = newComments.reverse();

    const modalDelete = () => {
        setModal(!modal);
    }

    const deleteOk = async () => {
        if(post.attributes.comments.data.length) {
            for (const element of post.attributes.comments.data) {
                const {data} = await notificationsServices.filterNotificationByCommentId(element.id);
                dispatch(deleteNotification(data[0].id));
                dispatch(deleteComment(element.id));
                dispatch(deletePost(post.id));
                setModal(!modal);
                navigate(`/community`);
            }
        } else {
            dispatch(deletePost(post.id));
            setModal(!modal);
            navigate(`/community`);
        }
    }

    const deleteCansel = () => {
        setModal(!modal);
        navigate(`${pathname}`);
    }

    return (
        <div className={css.post__main}>
            {post.attributes.post.type === 'achievement' &&
                <div className={css.post__block}>
                    {post.attributes.userId === user.id &&
                        <div onClick={modalDelete}>close</div>
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
                        <div className={css.post__block_header}>
                            <div className={css.post__username}>{post.attributes.post.username}</div>
                            <div className={css.post__createdAt}>{createdAt[0]}</div>
                        </div>

                        <div className={css.post__tech}>{post.attributes.post.techName}</div>

                        <div className={css.post__test}>"{post.attributes.post.testName}"</div>

                        <div className={css.post__difficult}>
                            {EN ? 'Difficult' : 'Складність'}: {post.attributes.post.difficult}</div>

                        <div className={css.post__correctAnswer}>
                            {EN ? 'Сorrect answers' : 'Правильних відповідей'} {post.attributes.post.correctAnswer}
                            {EN ? ' of' : ' з'} {post.attributes.post.allExercises}
                        </div>

                        <div className={css.post__img}>
                            <img src={results} alt="results"/>
                        </div>
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

                        </div>
                    }

                    {reverseComments.length > 0 &&
                        <CommentDetails key={value.id} comments={reverseComments}/>
                    }

                </div>
            }

            {post.attributes.post.type === 'question' &&
                <div className={css.post__block}>
                    <div className={css.post__block_header}>
                        <div className={css.post__block_header_left}>
                            {/*<img src={questionColor} alt="question" className={css.post__question}/>*/}
                            <div className={css.post__username}>{post.attributes.post.userName}</div>
                        </div>
                        <div className={css.post__createdAt}>{createdAt[0]}</div>
                    </div>

                    <div className={css.question_title}>{post.attributes.post.title}</div>

                    <div>{post.attributes.post.description}</div>

                    {post.attributes.post.details &&
                        <SyntaxHighlighter className={css.comment__block_box}>
                            {post.attributes.post.details}
                        </SyntaxHighlighter>
                    }

                    <div>{post.attributes.post.expected_result}</div>

                    <div className={css.post__block_footer}>
                        <div onClick={() => navigate(`/community/question/${post.attributes.post.id}`)}
                             className={css.post__message_question}>
                            <div>{EN ? 'Go to discussion' : 'Перейти до обговорення'}</div>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};


export {PostDetails};
