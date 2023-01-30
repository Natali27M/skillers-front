import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import cssComment from '../Comment/Comment.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import basket from '../../../../images/community/basket.svg';
import {deleteComment, deleteNotification} from '../../../../store';
import {notificationsServices} from '../../../../services';
import css from '../Comment/Comment.module.css';
import avatar from '../../../../images/avatar.jpg';

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
                    <div id={commentId} className={cssComment.comment__block}>
                        <div className={css.comment__main}>
                            <img src={avatar} alt="user" className={css.comment__user}/>
                            <div className={cssComment.comment__main_box}>
                                <div className={cssComment.comment__username}>{comment.attributes.username}</div>
                                <div className={cssComment.comment__createdAt}>{createdAt[0]}</div>

                                <SyntaxHighlighter className={cssComment.comment__block_box}>
                                    {comment.attributes.comment}
                                </SyntaxHighlighter>

                                {user.id === comment.attributes.userId &&
                                    <div onClick={deletedComment} className={cssComment.basket}>
                                        <img src={basket} alt="delete"/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
;

export {MoreComment};
