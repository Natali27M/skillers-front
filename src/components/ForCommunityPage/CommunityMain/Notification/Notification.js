import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import css from './Notification.module.css';
import {updateNotification} from '../../../../store';
import avatar from '../../../../images/avatar.jpg';
import vacancyTimeDisplay from "../../../../RootFunctions/vacancyTimeDisplay";

const Notification = ({notification, setOpenNotification}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const postId = notification.attributes.postId;
    const commentId = notification.attributes.idComment;
    const createdAt = notification.attributes.createdAt.split('T');
    const url = notification.attributes.url;

    const getPostDetails = () => {
        if (params.id && !postId) {
            navigate(`/${url}/${params.id}`, {
                state: {
                    commentId: commentId
                },
            });
        } else if (!params.id && postId) {
            navigate(`/${url}/${postId}`, {
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
                 className={notification.attributes.isReaded === false ?
                     css.notification__noReaded : css.notification__readed}>

                <div className={css.notification__created}>{vacancyTimeDisplay(createdAt[0])}</div>

                <div className={css.notification__box}>
                    <img src={avatar} alt="user" className={css.notification__user}/>

                    <div>{EN ? `${notification.attributes.username} leaves a comment on your post`
                        : `${notification.attributes.username} залишає коментар до вашого посту`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Notification};
