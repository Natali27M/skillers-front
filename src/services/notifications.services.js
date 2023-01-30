import {axiosServices} from './axios.services';

import {urls} from '../config';

export const notificationsServices = {
    getAllNotifications: (userId, pageNumber) => axiosServices
        .get(urls.notifications + `?pagination[page]=${pageNumber}&pagination[pageSize]=50&filters[postAuthorId][$eq]=${userId}&sort=createdAt:DESC`)
        .then(value => value.data),
    getNoReadNotifications: (userId) => axiosServices
        .get(urls.notifications + `?filters[postAuthorId][$eq]=${userId}&filters[isReaded][$eq]=false&sort=createdAt:DESC`)
        .then(value => value.data),
    getNoOpenedNotifications: (userId) => axiosServices
        .get(urls.notifications + `?filters[postAuthorId][$eq]=${userId}&filters[isOpened][$eq]=false&sort=createdAt:DESC`)
        .then(value => value.data),
    createNotification: (obj) => axiosServices.post(urls.notifications, {data: {...obj}})
        .then(value => value.data),
    updateNotification: (data, id) => axiosServices.put(`${urls.notifications}/${id}`, {data: {...data}})
        .then(value => value.data),
    deleteNotification: (notificationId) => axiosServices.delete(`${urls.notifications}/${notificationId}`)
        .then(value => value.data),
    filterNotificationByCommentId: (commentId) => axiosServices
        .get(`${urls.notifications}?filters[idComment][$eq]=${commentId}`)
        .then(value => value.data),
}
