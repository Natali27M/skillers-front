import {axiosServices} from './axios.services';

import {urls} from '../config';

export const exercisesServices = {
    createExercise: (data) => axiosServices.post(urls.exercises, {data}).then(value => value.data.data),
    createVariant: (data) => axiosServices.post(urls.variants, {data}).then(value => value.data),
    getTestExercises: (testId) => axiosServices.get(`${urls.exercises}${testId}`).then(value => value.data.data)
};