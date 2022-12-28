import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const recruiterService = {
    createRecruiter: (recruiter) => axiosServices.post(urls.recruiters, {data: {...recruiter, isConfirmed: false}})
        .then(value => value.data),
    getRecruiterByUserIdNotConfirmed: (userId) => axiosServices.get(urls.recruiters + `?filters[userId][$eq]=${userId}&filters[isConfirmed][$eq]=false`)
        .then(value => value.data),
    getAllRecruiters: () => axiosServices.get(urls.recruiters)
        .then(value => value.data),
    updateRecruiter: (id, booleanValue) => axiosServices.put(urls.recruiters + `/${id}`, {data: {isConfirmed: booleanValue}})
        .then(value => value.data),
}
