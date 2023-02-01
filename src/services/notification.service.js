import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const notificationService = {
    createNotification: (obj) => axiosServices.post(urls.notifications, {data: {...obj}})
        .then(value => value.data),
    getOne: (query) => axiosServices.get(`${urls.notifications}?${query}`)
        .then(value => value.data),
    deleteNotification: (id) => axiosServices.delete(urls.notifications + `/${id}`)
        .then(value => value.data)
}
