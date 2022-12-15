import {userServices} from '../services';
import badgesProcessing from './badgesProcessing';

export default async function createBadgesForAllUsers() {
    const users = await userServices.getAllUsers();
    for (const user of users) {
        await badgesProcessing(user?.id);
    }
}