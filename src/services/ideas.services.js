import {axiosServices} from "./axios.services";
import {axiosProxyServices} from "./axios.proxy.services";

import {proxyUrls, urls} from "../config";

export const ideasServices = {
    createIdea: (idea) => axiosServices.post(urls.ideas, {data: {...idea}})
        .then(value => value.data),
    getAllIdeas: (page, query) => axiosServices.get(`${urls.ideas}?populate=%2A&${query}&pagination[pageSize]=10&pagination[page]=${page}&sort=createdAt:desc`)
        .then(value => value.data),
    getOneIdea: (id) => axiosServices.get(urls.ideas + `/${id}?populate=%2A`)
        .then(value => value.data),
    deleteAllConversations: (ideaId) => axiosProxyServices.post(`${proxyUrls.cascadeDelete.discussions}`, {ideaId})
        .then(value => value.data),
    deleteMyIdea: (id) => axiosServices.delete(urls.ideas + `/${id}`)
        .then(value => value.data),
    updateIdea: (ideaId, postId) => axiosServices.put(`${urls.ideas}/${ideaId}`, {data: {postId}})
        .then(value => value.data),
};
