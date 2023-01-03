import {axiosServices} from './axios.services';

import {urls} from '../config';

export const codeTestServices = {
    getOneTest: (testId) => axiosServices.get(`${urls.codeTests}/${testId}`).then(value => value.data.data),
    deleteTest: (testId) => axiosServices.delete(`${urls.codeTests}/${testId}`),
    updateTest: (testId, data) => axiosServices.put(`${urls.codeTests}/${testId}`, {
        data: {...data}
    }).then(value => value.data.data),
    getCodeTestsPaginated: (techId, pageNum, sortParams, order, ukr) => axiosServices.get(
        `${urls.codeTests}?filters[techId][$eq]=${techId}&pagination[page]=${pageNum}&pagination[pageSize]=15&filters[ukrLng][$eq]=${ukr}&filters[isPrivate][$eq]=false&filters[isApproved][$eq]=true&sort=${sortParams}:${order}`
    ).then(value => value.data),
    getAllCodeTestsPaginated: (pageNum) => axiosServices.get(
        `${urls.codeTests}?pagination[page]=${pageNum}&pagination[pageSize]=25`).then(value => value.data),
    getCodeTestsForApprove: (pageNum) => axiosServices.get(
        `${urls.codeTests}?pagination[page]=${pageNum}&pagination[pageSize]=5&filters[isApproved][$eq]=false`
    ).then(value => value.data),
    getCodeTestsByQueryPaginated: (query, pageNum, ukr) => axiosServices.get(
        `${urls.codeTests}?filters[name][$contains]=${query}&pagination[page]=${pageNum}&pagination[pageSize]=15&filters[ukrLng][$eq]=${ukr}&filters[isPrivate][$eq]=false&filters[isApproved][$eq]=true&sort=createdAt:desc`
    ).then(value => value.data),
    createCodeRate: (userId, testId, rate) => axiosServices.post(urls.codeRates, {
        data: {
            userId,
            testId,
            rate
        }
    }).then(value => value.data),
    getTestsByUserPaginated: (authorId, pageNum) => axiosServices.get(
        `${urls.codeTests}?filters[authorId][$eq]=${authorId}&pagination[page]=${pageNum}&pagination[pageSize]=5&sort=createdAt:desc`
    ).then(value => value.data),
    getUserRateByCodeTest: (userId, testId) => axiosServices.get(`${urls.codeRates}?filters[userId][$eq]=${userId}&filters[testId][$eq]=${testId}`)
        .then(value => value.data),
    createCodeTest: (data) => axiosServices.post(urls.codeTests, {data: {...data}}).then(value => value.data.data),
    getTopTestsByTech: (techId) => axiosServices
        .get(`${urls.codeTests}?filters[techId][$eq]=${techId}&filters[isPrivate][$eq]=false&pagination[page]=1&pagination[pageSize]=1&sort=avgMark:desc&sort=allMarks:desc`)
        .then(value => value.data)
};