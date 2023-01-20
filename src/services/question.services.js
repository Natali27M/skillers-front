import {axiosServices} from "./axios.services";
import {urls} from "../config";

export const questionServices = {
    createQuestion: (question) => axiosServices.post(urls.questions, {data: {...question}})
        .then(value => value.data),
    getAllQuestions: (pageNum) => axiosServices.get(`${urls.questions}?populate=%2A&pagination[pageSize]=10&pagination[page]=${pageNum}&sort=createdAt:desc`)
        .then(value => value.data),
    getOneQuestion: (id) => axiosServices.get(urls.questions + `/${id}`)
        .then(value => value.data),
}
