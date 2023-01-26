import {axiosServices} from './axios.services';

import {urls} from '../config';

export const vacancyResponsesServices = {
    createResponse: (data) => axiosServices.post(urls.vacancyResponse, {data: data}).then(value => value.data),
    getUserByVacancyResponse: (userId, vacancyId) =>
        axiosServices.get(`${urls.vacancyResponse}?filers[userId][$eq]=${userId}&filers[vacancyId][$eq]=${vacancyId}`)
            .then(value => value.data),
    getResponsesByVacancyPaginated: (vacancyId, pageNumber) =>
        axiosServices.get(`${urls.vacancyResponse}?filers[vacancyId][$eq]=${vacancyId}&pagination[page]=${pageNumber}&pagination[pageSize]=10`)
            .then(value => value.data)
};
