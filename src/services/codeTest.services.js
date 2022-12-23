import {axiosServices} from './axios.services';

import {urls} from '../config';

export const codeTestServices = {
    getOneTest: (testId) => axiosServices.get(`${urls.codeTests}/${testId}`).then(value => value.data.data),
    updateTest: (testId, data) => axiosServices.put(`${urls.codeTests}/${testId}`, {
        data: {...data}
    }).then(value => value.data.data),
    getCodeTestsPaginated: (techId, pageNum, sortParams, order) => axiosServices.get(
        `${urls.codeTests}?filters[techId][$eq]=${techId}&pagination[page]=${pageNum}&pagination[pageSize]=15&sort=${sortParams}:${order}`
    ).then(value => value.data),
    getCodeTestsByQueryPaginated: (query, pageNum) => axiosServices.get(
        `${urls.codeTests}?filters[name][$contains]=${query}&pagination[page]=${pageNum}&pagination[pageSize]=15&sort=createdAt:desc`
    ).then(value => value.data),
    createCodeRate: (userId, testId, rate) => axiosServices.post(urls.codeRates, {
        data: {
            userId,
            testId,
            rate
        }
    }).then(value => value.data),
    getUserRateByCodeTest: (userId, testId) => axiosServices.get(`${urls.codeRates}?filters[userId][$eq]=${userId}&filters[testId][$eq]=${testId}`)
        .then(value => value.data),
    createCodeTest: (data) => axiosServices.post(urls.codeTests, {data: {...data}}).then(value => value.data.data)
};