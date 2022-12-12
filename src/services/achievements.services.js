import {axiosServices} from './axios.services';

import {urls} from '../config';

export const achievementsServices = {
    getLeaderBord: (pageNumber) => axiosServices.get(urls.achievementPaginated + pageNumber).then(value => value.data),
    getLeaderBordTen: (pageNumber) => axiosServices.get(urls.achievementPaginatedTen + pageNumber).then(value => value.data),
    getLeaderBordByQuery: (pageNumber, query) => axiosServices.get(urls.achievementPaginated + pageNumber + '&filters[userName][$contains]=' + query).then(value => value.data),
    getLeaderBordByQueryTen: (currentPage, query) => axiosServices.get(urls.achievementPaginatedTen + currentPage + '&filters[userName][$contains]=' + query).then(value => value.data),
    searchUserAchievement: (userId) => axiosServices.get(`${urls.achievementsByUser}${userId}`).then(value => value.data.data[0]),
    updateAchievement: (achId, data) => axiosServices.put(`${urls.achievements}/${achId}`, {data}).then(value => value.data.data),
    createAchievement: (data) => axiosServices.post(urls.achievements, {data}).then(value => value.data)
};
