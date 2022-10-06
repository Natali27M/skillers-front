import {axiosServices} from './axios.services';

import {urls} from '../config';

export const testsServices = {
    getTestsPaginated: (techId, pageNum) => axiosServices.get(
        `${urls.tests}?filters[techId][$eq]=${techId}&filters[isApproved][$eq]=true&pagination[page]=${pageNum}&pagination[pageSize]=15&sort=createdAt:desc`
    ).then(value => value.data),
    getTestsByQueryPaginated: (query, pageNum) => axiosServices.get(
        `${urls.tests}?filters[name][$contains]=${query}&filters[isApproved][$eq]=true&pagination[page]=${pageNum}&pagination[pageSize]=15&sort=createdAt:desc`
    ).then(value => value.data),
    gstTestsForApprove: (pageNum) => axiosServices.get(
        `${urls.tests}?filters[isApproved][$eq]=false&pagination[page]=${pageNum}&pagination[pageSize]=10`
    ).then(value => value.data),
    getOneTest: (testId) => axiosServices.get(`${urls.tests}/${testId}`).then(value => value.data.data),
    createTest: (data) => axiosServices.post(urls.tests, {data}, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data.data),
    approveTest: (testId) => axiosServices.put(`${urls.tests}/${testId}`, {data: {isApproved: true}}, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data.data),
    deleteTest: (testId) => axiosServices.delete(`${urls.tests}/${testId}`, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data),
    updateTest: (testId, updateObj) => axiosServices.put(`${urls.tests}/${testId}`, {data: {...updateObj}}, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data),
    getTechnologyName: (techId) => axiosServices.get(`${urls.techNames}/${techId}`).then(value => value.data.data.attributes.name),
    getUserRateByTest: (userId, testId) => axiosServices.get(`${urls.rates}?filters[userId][$eq]=${userId}&filters[testId][$eq]=${testId}`)
        .then(value => value.data),
    createUserRate: (userId, testId, rate) => axiosServices.post(urls.rates, {
        data: {
            userId,
            testId,
            rate
        }
    }).then(value => value.data),
    getTopTestsByTech: (techId) => axiosServices
        .get(`${urls.tests}?filters[techId][$eq]=${techId}&pagination[page]=1&pagination[pageSize]=3&sort=avgMark:desc&sort=allMarks:desc`)
        .then(value => value.data.data)
};