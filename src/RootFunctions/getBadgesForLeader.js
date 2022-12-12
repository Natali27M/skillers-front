import {badgesServices} from '../services';

export default async function getBadgesForLeader(userId) {
    const allBadges = await badgesServices.getUserBadges(userId);

    const badges = allBadges.data[allBadges.data.length - 1];

    if (!badges) {
        return null;
    }

    const startBadgesObj = {...badges.attributes.badgesArray};

    let result = [];

    for (const badge in startBadgesObj) {
        if (+startBadgesObj[badge] < 5) {
            continue;
        }
        const resultCount = +startBadgesObj[badge];

        let starCount = 0;

        if (resultCount < 10) {
            starCount = 1;
        } else if (resultCount < 20) {
            starCount = 2;
        } else if (resultCount < 40) {
            starCount = 3;
        } else if (resultCount < 60) {
            starCount = 4;
        } else {
            starCount = 5;
        }

        result.push({techId: +badge, count: starCount});
    }

    if (result?.length) {
        return result;
    }

    return null;
}