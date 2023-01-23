import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import css from './Notification.module.css';
import {getPostById} from '../../../../store';

const Notification = ({notification}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postId = notification.postId

    const getPostDetails = () => {
        dispatch(getPostById({postId}));
        navigate(`/post/${postId}`);
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
