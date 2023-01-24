import React from 'react';

import css from '../Comment/Comment.module.css';
import cssPost from '../Post/Post.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import basket from '../../../../images/community/basket.svg';
import {deleteComment} from '../../../../store';
import {useDispatch, useSelector} from 'react-redux';

const MoreComment = ({comment}) => {
    const {user} = useSelector(state => state['userReducers']);
    const createdAt = comment.attributes.createdAt.split('T');
    const dispatch = useDispatch();
    const commentId = comment.id;

    const deletedComment = () => {
        dispatch(deleteComment(commentId));
    }

    return (
        <div>
            <div className={css.comment__block}>
                <div className={cssPost.post__block_header}>
                    <div className={cssPost.post__username}>{comment.attributes.username}</div>
                    <div className={cssPost.post__createdAt}>{createdAt[0]}</div>
                </div>

                <SyntaxHighlighter className={css.comment__block_box}>
                    {comment.attributes.comment}
                </SyntaxHighlighter>

                {user.id === comment.attributes.userId &&
                    <div onClick={deletedComment} className={css.basket}><img src={basket} alt="delete"/></div>
                }
            </div>
        </div>
    );
};

export {MoreComment};
