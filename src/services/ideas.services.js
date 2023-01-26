import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const ideasServices = {
    createIdea: (idea) => axiosServices.post(urls.ideas, {data: {...idea}}).then(value => value.data),
    getAllIdeas: (page, query) => axiosServices.get(`${urls.ideas}?populate=%2A&${query}&pagination[pageSize]=10&pagination[page]=${page}&sort=createdAt:desc`)
        .then(value => value.data),
}
