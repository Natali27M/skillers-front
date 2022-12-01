import {axiosServices} from './axios.services';

import {urls} from '../config';

export const resultsServices = {
    getUserResult: (userId, pageNum) => axiosServices.get(`${urls.testResultsByUser}${userId}&pagination[pageSize]=5&pagination[page]=${pageNum}&sort=createdAt:desc`).then(value => value.data),
    getUserResultWithTechId: (userId, pageNum) => axiosServices.get(`${urls.testResultsByUser}${userId}&filters[techId][$notNull]=true&pagination[pageSize]=15&pagination[page]=${pageNum}&sort=createdAt:desc`).then(value => value.data),
    getUserResultAll: (userId) => axiosServices.get(`${urls.testResultsByUser}${userId}&pagination[pageSize]=30&pagination[page]=1`).then(value => value.data),
    getUserByTestResult: (userId, testId) => axiosServices.get(`${urls.testResultsByUser}${userId}&filters[testId][$eq]=${testId}`)
        .then(value => value.data.data),
    geAllTestResults: (testId, pageNumber) => axiosServices.get(`${urls.testResults}?filters[testId][$eq]=${testId}&pagination[pageSize]=20&pagination[page]=${pageNumber}`)
        .then(value => value.data),
    createResult: (data) => axiosServices.post(urls.testResults, {data}).then(value => value.data),
    getFullTestResults: (userId, testId) => axiosServices.get(`${urls.fullTestResults}?filters[userId][$eq]=${userId}&filters[testId][$eq]=${testId}`).then(value => value.data)
};
