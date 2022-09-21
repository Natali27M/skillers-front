import {axiosServices} from './axios.services';

import {urls} from '../config';

export const testsServices = {
    getTestsPaginated: (techId, pageNum) => axiosServices.get(
        `${urls.tests}?filters[techId][$eq]=${techId}&filters[isApproved][$eq]=true&pagination[page]=${pageNum}&pagination[pageSize]=15`
    ).then(value => value.data),
    getTestsByQueryPaginated: (query, pageNum) => axiosServices.get(
        `${urls.tests}?filters[name][$contains]=${query}&filters[isApproved][$eq]=true&pagination[page]=${pageNum}&pagination[pageSize]=15`
    ).then(value => value.data),
    gstTestsForApprove: (pageNum) => axiosServices.get(
        `${urls.tests}?filters[isApproved][$eq]=false&pagination[page]=${pageNum}&pagination[pageSize]=10`
    ).then(value => value.data.data),
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
    getTechnologyName: (techId) => axiosServices.get(`${urls.techNames}/${techId}`).then(value => value.data.data.attributes.name)
};