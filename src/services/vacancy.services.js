import {axiosServices} from './axios.services';

import {urls} from '../config';

export const vacancyServices = {
    createVacancy: (data) => axiosServices.post(urls.vacancies, {data: data}).then(value => value.data),
    getVacancyPaginated: (pageNumber) => axiosServices.get(`${urls.vacancies}?populate=%2A&pagination[page]=${pageNumber}&pagination[pageSize]=10&sort=createdAt:desc`)
        .then(value => value.data)


};
