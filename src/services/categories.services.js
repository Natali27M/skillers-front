import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const categoriesServices = {
    getAllCategories: () => axiosServices.get(urls.categories).then(value => value.data),
};
