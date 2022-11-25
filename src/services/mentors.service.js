import {axiosServices} from "./axios.services";
import {urls} from "../config";

export const mentorsService = {
    createMentor: (mentorData) => axiosServices.post(urls.mentors, {
        data: {
            ...mentorData, isConfirmedMentor: false,
        }
    }).then(value => value.data),
    getMentorsPaginated: (pageNumber) => axiosServices
        .get(`${urls.mentors}?pagination[page]=${pageNumber}&pagination[pageSize]=10&sort=createdAt:desc`,
            {
                headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
            }).then(value => value.data),
    updateIsConfirmedMentor: (id, booleanValue) => axiosServices.put(`${urls.mentors}/${id}`, {data: {isConfirmedMentor: booleanValue}}, {
        headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
    }).then(value => value.data),
    deleteMentor: (id) => axiosServices.delete(`${urls.mentors}/${id}`,
        {
            headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`}
        }).then(value => value.data),
    getMentorsPaginatedConfirmed: (query, pageNumber) => axiosServices(
        `${urls.mentors}?populate=%2A&filters[isConfirmedMentor][$eq]=true&${query}&pagination[page]=${pageNumber}&pagination[pageSize]=10&sort=createdAt:desc`
    ).then(value => value.data),
};
