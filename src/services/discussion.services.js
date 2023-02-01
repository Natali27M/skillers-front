import {axiosServices} from "./axios.services";

import {urls} from "../config";

export const discussionServices = {
    createOpinion: (opinion) => axiosServices.post(urls.discussions, {data: {...opinion}}).then(value => value.data),
    deleteOpinion: (id) => axiosServices.delete(urls.discussions + `/${id}`).then(value => value.data),
}
