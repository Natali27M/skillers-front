import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const recruiterService = {
    createRecruiter: (recruiter) => axiosServices.post(urls.recruiters, {data: {...recruiter, isConfirmed: false}})
        .then(value => value.data),
    getRecruiterByUserId: (userId) => axiosServices.get(urls.recruiters + `?filters[userId][$eq]=${userId}`)
        .then(value => value.data),
    getAllRecruiters: (page) => axiosServices.get(urls.recruiters + `?pagination[page]=${page}&pagination[pageSize]=10&sort=createdAt:desc`)
        .then(value => value.data),
    updateRecruiter: (id, booleanValue) => axiosServices.put(urls.recruiters + `/${id}`, {data: {isConfirmed: booleanValue}})
        .then(value => value.data),
    deletedRecruiter: (id) => axiosServices.delete(urls.recruiters + `/${id}`)
        .then(value => value.data),
}
