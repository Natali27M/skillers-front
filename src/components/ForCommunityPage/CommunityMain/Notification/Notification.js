import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import css from './Notification.module.css';
import {updateComment} from '../../../../store';

const Notification = ({notification, setOpenNotification}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postId = notification.postId;

    const getPostDetails = () => {
        const commentId = notification.notifications.id;
        dispatch(updateComment({data:  {notification: true}, commentId: commentId}));
        navigate(`/post/${postId}`);
        setOpenNotification(false);
    };

    return (
        <div>
            <div onClick={() => {
                getPostDetails();
            }}>
                {notification.notifications.attributes.username} залишили коментар до посту
            </div>
        </div>
    );
};

export {Notification};
