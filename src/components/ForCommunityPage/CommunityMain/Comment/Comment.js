import React, {useEffect, useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {useDispatch, useSelector} from 'react-redux';

import css from "./Comment.module.css";
import cssPost from "../Post/Post.module.css";
import basket from '../../../../images/community/basket.svg';
import {MoreComment} from '../MoreComment/MoreComment';
import {notificationsServices} from '../../../../services';
import {deleteComment, deleteNotification} from '../../../../store';

const Comment = ({comment, comments}) => {
    const {user} = useSelector(state => state['userReducers']);
    const {status, isDeletedNotification} = useSelector(state => state['commentReducers']);
    const [moreComments, setMoreComments] = useState(false);
    const createdAt = comment.attributes.createdAt.split('T');
    const dispatch = useDispatch();
    const commentId = comment.id;

    const clickMoreComments = () => {
        if (!moreComments) {
            setMoreComments(true);
        } else {
            setMoreComments(false);
        }
    }

    const deletedComment = async () => {
        const {data} = await notificationsServices.findNotificationByCommentId(commentId);
        dispatch(deleteNotification(data[0].id));
        dispatch(deleteComment(commentId));
    };

    return (
        <div>
            <div id={comment.id} className={css.comment__block}>
                <div className={cssPost.post__block_header}>
                    <div className={css.post__username}>{comment.attributes.username}</div>
                    <div className={css.post__createdAt}>{createdAt[0]}</div>
                </div>

                <SyntaxHighlighter className={css.comment__block_box}>
                    {comment.attributes.comment}
                </SyntaxHighlighter>

                {user.id === comment.attributes.userId &&
                    <div onClick={deletedComment} className={css.basket}><img src={basket} alt="delete"/></div>
                }
            </div>

            {comments.length > 1 &&
                <div onClick={clickMoreComments} className={css.comment__block_more}>More comments</div>
            }

            {moreComments && comments.slice(1).map(value => <MoreComment key={value.id} comment={value}/>)}
        </div>
    );
};

export {Comment};
