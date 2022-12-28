import {resultsServices} from '../services/results.services';
import {badgesServices} from '../services';

export default async function badgesProcessing(userId, currentResult, badgeId) {
    return new Promise(async resolve => {
        console.log(userId);

        const getAllResultsWithTechId = async (id) => {
            let endResult = [];
            if (currentResult) {
                endResult.push({id: 0, attributes: currentResult});
            }
            let firstPage = await resultsServices.getUserResultWithTechId(id, 1);
            if (!firstPage?.data?.length) {
                resolve(null);
            }
            firstPage.data = firstPage.data.filter(element => element?.attributes?.testId !== currentResult?.testId);
            endResult = endResult.concat(firstPage?.data);
            if (firstPage?.meta?.pagination?.pageCount === 1) {
                return endResult;
            }
            for (let i = 2; i <= firstPage?.meta?.pagination?.pageCount; i++) {
                const nextPage = await resultsServices.getUserResultWithTechId(id, i);
                endResult = endResult.concat(nextPage?.data);
            }
            return endResult;
        };

        const allResults = await getAllResultsWithTechId(userId);

        const techGrouping = (results) => {
            let techGroups = {};
            for (const result of results) {
                techGroups[result?.attributes?.techId]
                    ?
                    techGroups[result?.attributes?.techId]++
                    :
                    techGroups[result?.attributes?.techId] = 1;
            }
            return techGroups;
        };

        const badgeData = techGrouping(allResults);


        if (badgeId) {
            await badgesServices.updateBadges(badgeId, badgeData);
        } else {
            await badgesServices.createBadge(userId, badgeData);
        }

        resolve();

    });
}