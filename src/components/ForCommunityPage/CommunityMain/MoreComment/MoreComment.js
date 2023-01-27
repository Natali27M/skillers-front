import React, {useState} from 'react';

import css from '../Comment/Comment.module.css';
import cssPost from '../Post/Post.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import basket from '../../../../images/community/basket.svg';
import {deleteComment, deleteNotification} from '../../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {notificationsServices} from '../../../../services';
import {useLocation, useParams} from 'react-router-dom';

const MoreComment = ({comment}) => {
        const {user} = useSelector(state => state['userReducers']);
        const [commentDelete, setCommentDelete] = useState(false);
        const createdAt = comment.attributes.createdAt.split('T');
        const dispatch = useDispatch();
        const {state} = useLocation();
        const commentId = comment.id;
        let element = document.getElementById(`${state?.commentId}`);

        if (element) {
            element.scrollIntoView();
        }

        const deletedComment = async () => {

            setCommentDelete(true);
            const {data} = await notificationsServices.filterNotificationByCommentId(commentId);
            dispatch(deleteNotification(data[0].id));
            dispatch(deleteComment(commentId));
        };

        return (
            <div>
                {!commentDelete &&
                    <div id={commentId} className={css.comment__block}>
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
                }
            </div>
        );
    }
;

export {MoreComment};
