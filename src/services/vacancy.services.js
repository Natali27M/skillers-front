import {axiosServices} from './axios.services';

import {urls} from '../config';

export const vacancyServices = {
    createVacancy: (data) => axiosServices.post(urls.vacancies, {data: data}).then(value => value.data),
    getVacancyPaginated: (query, pageNumber) => axiosServices.get(`${urls.vacancies}?populate=%2A&${query}&pagination[page]=${pageNumber}&pagination[pageSize]=10&sort=createdAt:desc`)
        .then(value => value.data),
    getOneVacancy: (id) => axiosServices.get(`${urls.vacancies}/${id}?populate=%2A`).then(value => value.data.data),
    updateVacancy: (id, data) => axiosServices.put(`${urls.vacancies}/${id}`, {data: data}).then(value => value.data),
    getVacanciesPageByEmployer: (employerId, pageNumber) =>
        axiosServices.get(`${urls.vacancies}?populate=%2A&filters[employerId][$eq]=${employerId}&pagination[page]=${pageNumber}&pagination[pageSize]=10&sort=createdAt:desc`)
            .then(value => value.data),
};
