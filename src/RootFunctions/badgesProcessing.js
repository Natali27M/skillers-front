import {resultsServices} from '../services/results.services';
import {badgesServices} from '../services';

export default async function badgesProcessing(userId) {
    return new Promise(async resolve => {
        const getAllResultsWithTechId = async (id) => {
            let endResult = [];
            const firstPage = await resultsServices.getUserResultWithTechId(id, 1);
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
            console.log(results);
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

        // await badgesServices.createBadge(userId, badgeData);

        resolve();

    });
}