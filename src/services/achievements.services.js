import {axiosServices} from './axios.services';

import {urls} from '../config';

export const achievementsServices = {
    getLeaderBord: () => axiosServices.get(urls.achievementPaginated).then(value => value.data.data),
    searchUserAchievement: (userId) => axiosServices.get(`${urls.achievementsByUser}${userId}`).then(value => value.data.data[0]),
    updateAchievement: (achId, data) => axiosServices.put(`${urls.achievements}/${achId}`, {data}).then(value => value.data.data),
    createAchievement: (data) => axiosServices.post(urls.achievements, {data}).then(value => value.data)
};