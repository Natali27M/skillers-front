import {axiosServices} from './axios.services';

import {urls} from '../config';

export const codeResultsServices = {
    createResult: (resultData) => axiosServices.post(urls.codeResults, {data: resultData}).then(value => value.data),
    getOneCodeResult: (resultId) => axiosServices.get(`${urls.codeResults}/${resultId}`).then(value => value.data.data),
    changeCodeResult: (resultId, data) => axiosServices.put(`${urls.codeResults}/${resultId}`, {data: data}).then(value => value.data.data),
    getUserCodeResults: (userId, pageNum) =>
        axiosServices.get(`${urls.codeResultsByUser}${userId}&pagination[pageSize]=5&pagination[page]=${pageNum}&sort=createdAt:desc`)
            .then(value => value.data),
    getCreatorResultForEvaluate: (authorId, pageNum) =>
        axiosServices.get(`${urls.codeResultForEvaluate}${authorId}&pagination[pageSize]=5&pagination[page]=${pageNum}&sort=createdAt:desc`)
            .then(value => value.data),
    getUserResultByCodeTest: (userId, testId) =>
        axiosServices.get(`${urls.codeResultsByUser}${userId}&filters[codeTestId][$eq]=${testId}`).then(value => value.data.data)
};