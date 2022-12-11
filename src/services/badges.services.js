import {axiosServices} from './axios.services';

import {urls} from '../config';

export const badgesServices = {
    createBadge: (userId, data) => axiosServices.post(urls.badges, {
        data: {
            userId,
            badgesArray: data
        }
    }).then(value => value.data),
    updateBadges: (id, data) => axiosServices.put(`${urls.badges}/${id}`,
        {
            data:
                {badgesArray: data}
        }).then(value => value.data),
    getUserBadges: (userId) => axiosServices.get(`${urls.badges}?filters[userId][$eq]=${userId}`).then(value => value.data)
};