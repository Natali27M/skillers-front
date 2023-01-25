import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import css from './Notification.module.css';
import {updateNotification} from '../../../../store';

const Notification = ({notification, setOpenNotification}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postId = notification.attributes.postId;
    const [scrollTop, setScrollTop] = useState(false);
    const commentId = notification.attributes.idComment;
    let element = document.getElementById(`${commentId}`);

    const getPostDetails = () => {
        dispatch(updateNotification({data: {isReaded: true}, notificationId: notification.id}));
        navigate(`/post/${postId}`);
        setOpenNotification(false);
        if (element) {
            element.scrollIntoView();
        }
    };

    useEffect(() => {
            window.addEventListener('scroll', function () {
                let position;
                if (element !== null) {
                    position = element.getBoundingClientRect();
                } else {
                    return;
                }

                if (position.top < window.innerHeight && position.bottom >= 0) {
                    setScrollTop(true);
                    console.log(1)
                    dispatch(updateNotification({data: {isReaded: true}, notificationId: notification.id}));
                }
            });
        }, [scrollTop]);

    return (
        <div>
            <div onClick={() => {
                getPostDetails();
            }} className={scrollTop ? css.notification_active : css.notification_notActive}>
                {EN ? `${notification.attributes.username} leaves a comment on your post`
                    : `${notification.attributes.username} залишає коментар до вашого посту`}
            </div>
        </div>
    );
};

export {Notification};
