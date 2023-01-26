import {axiosServices} from './axios.services';

import {urls} from '../config';

export const notificationsServices = {
    getAllNotifications: () => axiosServices.get(urls.notifications + `?filters[isReaded][$eq]=false&sort=createdAt:DESC`)
        .then(value => value.data),
    createNotification: (obj) => axiosServices.post(urls.notifications, {data: {...obj}}).then(value => value.data),
    updateNotification: (data, id) => axiosServices.put(`${urls.notifications}/${id}`, {data: {...data}})
        .then(value => value.data),
    deleteNotification: (notificationId) => axiosServices.delete(`${urls.notifications}/${notificationId}`)
        .then(value => value.data),
    findNotificationByCommentId: (commentId) => axiosServices.get(`${urls.notifications}?find[idComment][$eq]=${commentId}`),
    notificationByCommentId: (commentId) => axiosServices.get(`${urls.notifications}?find[idComment][$eq]=${commentId}&filters[isReaded][$eq]=false`)
        .then(value => value.data)
}
