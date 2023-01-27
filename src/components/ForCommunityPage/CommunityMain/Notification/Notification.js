import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import css from './Notification.module.css';
import {updateNotification} from '../../../../store';

const Notification = ({notification, setOpenNotification}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const postId = notification.attributes.postId;
    const commentId = notification.attributes.idComment;

    const getPostDetails = () => {
        if (params.id && !postId) {
            navigate(`/post/${params.id}`, {
                state: {
                    commentId: commentId
                },
            });
        } else if (!params.id && postId) {
            navigate(`/post/${postId}`, {
                state: {
                    commentId: commentId
                },
            });
        }

        if (setOpenNotification) {
            setOpenNotification(false);
        }
        dispatch(updateNotification({data: {isReaded: true}, notificationId: notification.id}));
    };

    return (
        <div>
            <div onClick={() => {
                getPostDetails();
            }}
                 className={notification.attributes.isReaded === false ? css.notification_noReaded : css.notification_readed}>
                {EN ? `${notification.attributes.username} leaves a comment on your post`
                    : `${notification.attributes.username} залишає коментар до вашого посту`}
            </div>
        </div>
    );
};

export {Notification};
