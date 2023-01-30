import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import css from './PostDetails.module.css';
import cssPost from '../../ForCommunityPage/CommunityMain/Post/Post.module.css';
import message from '../../../images/community/message.svg';
import results from '../../../images/community/results.svg';
import {
    createComment,
    createNotification, deleteComment, deleteNotification, deletePost,
    getPostById,
} from '../../../store';
import {CommentDetails} from '../CommentDetails/CommentDetails';
import cssMainFirepadPage from '../../../pages/MainFirepadPage/MainFirepadPage.module.css';
import rootCSS from '../../../styles/root.module.css';
import {notificationsServices} from '../../../services';
import threePoint from '../../../images/community/three-point.svg';
import avatar from '../../../images/avatar.jpg';
import achievement from '../../../images/community/achievement.svg';

const PostDetails = ({post}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {status} = useSelector(state => state['commentReducers']);
    const {userRank} = useSelector(state => state['achievementsReducers']);
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
        if (post.attributes.comments.data.length) {
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
        <div className={css.post__details_main}>
            <div className={cssPost.post__main}>
                {post.attributes.userId === user.id &&
                    <div className={cssPost.delete__btn} onClick={modalDelete}>
                        <img src={threePoint} alt="delete"/>
                    </div>
                }

                {modal && <div className={cssMainFirepadPage.leave__main}>
                    <div className={cssMainFirepadPage.leave__modal_block}>
                        {EN ? 'Delete this post?' : 'Видалити цей пост?'}

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

                <div className={cssPost.post__header}>
                    <div className={cssPost.post__header_right}>
                        <img src={avatar} alt="user" className={cssPost.post__user}/>

                        <div className={cssPost.post__block_header}>
                            <div className={cssPost.post__username}>{post.attributes.post.username}</div>

                            <div className={cssPost.post__userRank}>{userRank}</div>

                            <div className={cssPost.post__createdAt}>{createdAt[0]}</div>
                        </div>
                    </div>

                    <div className={cssPost.post__type}>
                        <img src={achievement} alt="achievement"/>
                    </div>
                </div>

                <div>
                    <div className={cssPost.post__title}>
                        I passed the test {post.attributes.post.testName} on
                        technology {post.attributes.post.techName}
                    </div>

                    <div className={cssPost.post__description}>
                        Test difficulty {post.attributes.post.difficult}.
                        I gave {post.attributes.post.allExercises} correct answers
                        of {post.attributes.post.allExercises}
                    </div>
                    <div className={cssPost.post__img_main}>
                        <img src={results} alt="results"/>
                    </div>
                </div>

                <div className={cssPost.post__block_footer}>
                    <div onClick={wantComment} className={cssPost.post__message}>
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
        </div>
    );
};


export {PostDetails};
