import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const answersServices = {
    createAnswer: (answer) => axiosServices.post(urls.answers, {data: {...answer}})
        .then(value => value.data),
}
