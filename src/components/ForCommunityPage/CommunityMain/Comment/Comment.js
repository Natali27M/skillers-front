import React, {useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {useDispatch, useSelector} from 'react-redux';

import css from "./Comment.module.css";
import basket from '../../../../images/community/basket.svg';
import {MoreComment} from '../MoreComment/MoreComment';
import {notificationsServices} from '../../../../services';
import {deleteComment, deleteNotification} from '../../../../store';
import avatar from '../../../../images/avatar.jpg';

const Comment = ({comment, comments}) => {
    const {user} = useSelector(state => state['userReducers']);
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
        const {data} = await notificationsServices.filterNotificationByCommentId(commentId);
        dispatch(deleteNotification(data[0].id));
        dispatch(deleteComment(commentId));
    };

    return (
        <div>
            <div id={commentId} className={css.comment__block}>
                <div className={css.comment__main}>
                    <img src={avatar} alt="user" className={css.comment__user}/>
                    <div className={css.comment__main_box}>
                        <div className={css.comment__username}>{comment.attributes.username}</div>
                        <div className={css.comment__createdAt}>{createdAt[0]}</div>

                        <SyntaxHighlighter className={css.comment__block_box}>
                            {comment.attributes.comment}
                        </SyntaxHighlighter>

                        {user.id === comment.attributes.userId &&
                            <div onClick={deletedComment} className={css.basket}>
                                <img src={basket} alt="delete"/>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {comments.length > 1 &&
                <div onClick={clickMoreComments} className={css.comment__block_more}>More comments</div>
            }

            {moreComments && comments.slice(1).map(value => <MoreComment key={value.id} comment={value}/>)}
        </div>
    );
};

export {Comment};
