import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';

import css from './Post.module.css';
import {createComment, getPostById} from '../../../../store';
import {Comment} from '../Comment/Comment';
import questionColor from '../../../../images/community/questionColor.svg';
import message from '../../../../images/community/message.svg';
import results from '../../../../images/community/results.svg';

const Post = ({post}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const [sendComment, setSendComment] = useState(false);
    const {handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
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

    const makeComment = () => {
        const comment = {
            postId: postId,
            comment: value,
            userId: user.id,
            username: user.username,
            notification: false,
            postAuthorId: post.attributes.userId
        }
        dispatch(createComment(comment));
        reset();
        setValue('');
        setSendComment(false);
        dispatch(getPostById({postId}));
    };

    useEffect(() => {
    }, [comments]);

    return (
        <div className={css.post__main}>
            {post.attributes.post.type === 'achievement' &&
                <div className={css.post__block}>
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
                                {comments.length} {EN ? 'Comments' : 'Коментарів'}
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

                            {comments.length > 0 && <Comment key={value.id} comment={comments[0]} comments={comments}/>}
                        </div>
                    }
                </div>
            }

            {post.attributes.post.type === 'question' &&
                <div className={css.post__block}>
                    <div className={css.post__block_header}>
                        <div className={css.post__block_header_left}>
                            <img src={questionColor} alt="question" className={css.post__question}/>
                            <div className={css.post__username}>{post.attributes.post.userName}</div>
                        </div>
                        <div className={css.post__createdAt}>{createdAt[0]}</div>
                    </div>

                    <div className={css.post__test}>{post.attributes.post.title}</div>

                    <div>Description: {post.attributes.post.description}</div>

                    <SyntaxHighlighter className={css.comment__block_box}>
                        {post.attributes.post.details}
                    </SyntaxHighlighter>

                    <div>Expected result: {post.attributes.post.expected_result}</div>

                    <div className={css.post__block_footer}>
                        <div onClick={() => navigate(`/community/question/${post.attributes.post.id}`)}
                             className={css.post__message}>
                            {EN ? 'Go to discussion' : 'Перейти до обговорення'}
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};

export {Post};
