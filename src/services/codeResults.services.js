import {axiosServices} from './axios.services';

import {urls} from '../config';

export const codeResultsServices = {
    createResult: (resultData) => axiosServices.post(urls.codeResults, {data: resultData}).then(value => value.data),
    getUserCodeResults: (userId, pageNum) => axiosServices.get(`${urls.codeResultsByUser}${userId}&pagination[pageSize]=5&pagination[page]=${pageNum}&sort=createdAt:desc`).then(value => value.data)
};