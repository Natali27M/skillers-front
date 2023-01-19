import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import css from './Post.module.css';
import {userServices} from '../../../../services';
import {createComment} from '../../../../store';
import {Comment} from '../Comment/Comment';

const Post = ({post}) => {
    const [user, setUser] = useState({});
    const [sendComment, setSendComment] = useState(false);
    const {handleSubmit, reset, register} = useForm();
    const dispatch = useDispatch();
    const comments = post.attributes.comments.data;

    useEffect(() => {
        userServices.getUserById(post.attributes.userId).then(value => setUser(value));
    }, []);

    const wantComment = () => {
        if (!sendComment) {
            setSendComment(true);
        } else {
            setSendComment(false);
        }
    };

    const makeComment = (obj) => {
        const comment = {
            postId: post.id,
            comment: obj.comment,
            userId: user.id
        }
        dispatch(createComment(comment));
        reset();
    };

    return (
        <div>
            <div className={css.post__block}>
                <div>{user.username}</div>
                <div>{post.attributes.post.techName}</div>
                <div>{post.attributes.post.testName}</div>
                <div>Правильних
                    відповідей {post.attributes.post.correctAnswer} з {post.attributes.post.allExercises}</div>
            </div>
            <div>
                Comments
                <button onClick={wantComment}>Comment</button>
            </div>
            {sendComment &&
                <div>
                    <form onSubmit={handleSubmit(makeComment)}>
                        <input type="text"
                            // placeholder={EN ? 'Name' : 'Ім\'я'}
                               {...register('comment')}/>
                        <button>Send</button>
                    </form>
                </div>
            }
            {comments && comments.map(value => <Comment key={value.id} comment={value} user={user}/>)}
        </div>
    );
};

export {Post};
