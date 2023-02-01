import {axiosServices} from "./axios.services";
import {axiosProxyServices} from "./axios.proxy.services";

import {proxyUrls, urls} from "../config";

export const questionServices = {
    createQuestion: (question) => axiosServices.post(urls.questions, {data: {...question}})
        .then(value => value.data),
    getAllQuestions: (pageNum, query) => axiosServices.get(`${urls.questions}?populate=%2A&${query}&pagination[pageSize]=10&pagination[page]=${pageNum}&sort=createdAt:desc`)
        .then(value => value.data),
    getOneQuestion: (id) => axiosServices.get(urls.questions + `/${id}?populate=%2A`)
        .then(value => value.data),
    deleteAllAnswers: (id) => axiosProxyServices.post(proxyUrls.cascadeDelete.answers, {questionId: id})
        .then(value => value.data),
    deleteQuestion: (id) => axiosServices.delete(urls.questions + `/${id}`)
        .then(value => value.data),
    updateQuestion: (id, postId) => axiosServices.put(urls.questions + `/${id}`, {data: {postId}})
        .then(value => value.data),
}
