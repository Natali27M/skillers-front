import {axiosServices} from './axios.services';

import {urls} from '../config';

export const resultsServices = {
    getUserResult: (userId, pageNum) => axiosServices.get(`${urls.testResultsByUser}${userId}&pagination[pageSize]=5&pagination[page]=${pageNum}`).then(value => value.data),
    getUserByTestResult: (userId, testId) => axiosServices.get(`${urls.testResultsByUser}${userId}&filters[testId][$eq]=${testId}`)
        .then(value => value.data.data),
    createResult: (data) => axiosServices.post(urls.testResults, {data}).then(value => value.data)
};
