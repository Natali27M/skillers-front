import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const TechnologiesServices = {
    getTechnologies: () => axiosServices(urls.technologies).then(value => value.data),
};
