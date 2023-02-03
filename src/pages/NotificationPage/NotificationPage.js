import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Notification, PaginationSmall} from '../../components';
import {getAllNotifications} from '../../store';
import cssPosts from '../../components/ForCommunityPage/CommunityMain/Posts/Posts.module.css';
import css from './NotificationPage.module.css';

const NotificationPage = () => {
    const {user} = useSelector(state => state['userReducers']);
    const {notifications} = useSelector(state => state['notificationReducers']);
    const {EN} = useSelector(state => state['languageReducers']);
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();
    const userId = user?.id;

    useEffect(() => {
        if (userId) {
            dispatch(getAllNotifications({userId, pageNumber}));
        }
    }, [user]);


    return (
        <div className={cssPosts.posts__main_box}>
            {/*<Information/>*/}
            <div className={css.notifications__main}>
                {notifications?.data?.length ?
                    <>
                        <div className={css.notifications__main_box}>
                            {notifications?.data && notifications.data.map(value => <Notification key={value.id}
                                                                                                  notification={value}/>)}
                        </div>
                    </>
                    :
                    <div
                        className={css.no__notification}>{EN ? 'You have no notifications' : 'У вас немає сповіщень'}</div>
                }
                {!!notifications?.data?.length &&
                    <PaginationSmall
                        pageNumber={notifications?.meta?.pagination.page}
                        setPageNumber={setPageNumber}
                        pageCount={notifications?.meta?.pagination.pageCount}
                    />
                }

            </div>

        </div>
    );
};

export {NotificationPage};
