import {axiosServices} from './axios.services';

import {urls} from '../config';

export const feedbackService = {
    sendFeedback: (obj) => axiosServices.post(urls.feedback, {data: {...obj}}/*, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }*/).then(value => value.data),
    deleteFeedback: (id) => axiosServices.delete(`${urls.feedback}/${id}`, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data),
    getFeedbackPaginated: (pageNumber) => axiosServices
        .get(`${urls.feedback}?pagination[page]=${pageNumber}&pagination[pageSize]=15&sort=createdAt:desc`, {
            headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
        }).then(value => value.data),
    updateIsApproved: (id, booleanValue) => axiosServices.put(`${urls.feedback}/${id}`, {data: {isApproved: booleanValue}}, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data),
    getFeedbackPaginatedConfirmed: () => axiosServices
        .get(`${urls.feedback}?filters[isApproved][$eq]=true&pagination[pageSize]=4&sort=createdAt:desc`)
        .then(value => value.data),
};
