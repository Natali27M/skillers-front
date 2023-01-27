import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Notification} from '../../components';
import {getAllNotifications} from '../../store';

const NotificationPage = () => {
    const {user} = useSelector(state => state['userReducers']);
    const {notifications} = useSelector(state => state['notificationReducers']);
    const dispatch = useDispatch();
    const userId = user?.id;

    useEffect(() => {
        if (userId) {
            dispatch(getAllNotifications({userId}));
        }
    }, [user]);

    return (
        <div>
            {notifications && notifications.map(value => <Notification key={value.id} notification={value}/>)}
        </div>
    );
};

export {NotificationPage};
