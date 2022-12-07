import {techServices, testsServices} from '../services';
import {resultsServices} from '../services/results.services';

export async function getUsersForLeaderboard(newLeaderBord) {
    return new Promise(async (resolve) => {
        console.log(newLeaderBord,'function');

        //
    //     let sort = (arr) => {
    //         const res = []
    //         const gens = arr.map(item => function* (item) {
    //             for (let el of item) {
    //                 if (res.includes(el.id)) {
    //                     continue
    //                 }
    //
    //                 yield el.id
    //             }
    //         }(item));
    //
    //         while (true) {
    //             for (let gen of gens) {
    //
    //                 if (res.length === 5) {
    //                     return res
    //                 }
    //
    //                 res.push(gen.next().value)
    //             }
    //         }
    //
    //     }
    //
    //     let fullRecommendationTests = [];
    //
    //     if (fullUserResults?.data?.length !== 0) {
    //         const userResultData = fullUserResults?.data;
    //         const userId = user?.id;
    //         let userResultsWithTechId = [];
    //
    //         if (userResultData?.length > 0) {
    //             for (let i = 0; i < userResultData.length; i++) {
    //                 let testId = userResultData[i].attributes.testId;
    //                 try {
    //                     userResultsWithTechId.push(await testsServices.getOneTest(testId));
    //                 } catch (e) {
    //                     await resultsServices.deleteUserResultsTestById(userResultData[i].id);
    //                     console.error(e);
    //                 }
    //             }
    //         }
    //
    //         let allRecommendationTestsByTechId = [];
    //         if (userResultsWithTechId?.length > 0) {
    //             for (let i = 0; i < userResultsWithTechId.length; i++) {
    //
    //                 let techId = userResultsWithTechId[i].attributes.techId;
    //
    //                 try {
    //                     allRecommendationTestsByTechId.push(await testsServices.getRecommendationTests(techId));
    //                 } catch (e) {
    //                     console.error(e);
    //                 }
    //             }
    //         }
    //
    //         let filterAllRecommendationTestsByTechId = [];
    //         if (allRecommendationTestsByTechId?.length > 0) {
    //             const myTestsId = userResultData?.map(value => value.attributes.testId);
    //
    //             let filterRecommendationTests = allRecommendationTestsByTechId.map(value =>
    //                 value.filter(value => !myTestsId.includes(value.id)));
    //
    //             filterAllRecommendationTestsByTechId.push(
    //                 ...filterAllRecommendationTestsByTechId, ...filterRecommendationTests);
    //         }
    //
    //         let recommendationTestsId = [];
    //         if (filterAllRecommendationTestsByTechId?.length > 0) {
    //             recommendationTestsId = sort(filterAllRecommendationTestsByTechId);
    //         }
    //
    //         const userRecommendationTests = [];
    //         if (user) {
    //             userRecommendationTests.push(await resultsServices.recommendationTestsByUser(user?.id));
    //         }
    //
    //         const recId = userRecommendationTests[0]?.data[0]?.id;
    //
    //         if (userRecommendationTests[0]?.data?.length === 0 && userId && recommendationTestsId.length === 5) {
    //             try {
    //                 await resultsServices.createRecommendationTests({
    //                     userId: userId,
    //                     testsIdArray: recommendationTestsId
    //                 });
    //             } catch (e) {
    //                 console.error(e);
    //             }
    //         }
    //
    //         if (userId && recommendationTestsId.length === 5 && check === `update`) {
    //
    //             try {
    //                 await resultsServices.updateRecommendationTests(recId, {testsIdArray: recommendationTestsId});
    //             } catch (e) {
    //                 console.error(e);
    //             }
    //         }
    //
    //         if (userRecommendationTests[0]?.data[0]?.attributes?.testsIdArray.length) {
    //             const arrIdRecTests = userRecommendationTests[0]?.data[0]?.attributes?.testsIdArray
    //             for (let i = 0; i < arrIdRecTests.length; i++) {
    //                 const recId = arrIdRecTests[i];
    //                 try {
    //                     fullRecommendationTests.push(await testsServices.getOneTest(recId));
    //                 } catch (e) {
    //                     console.error(e);
    //                 }
    //             }
    //         }
    //     } else {
    //         let techNames = [];
    //         try {
    //             techNames = await techServices.getAllTech();
    //         } catch (e) {
    //             console.error(e);
    //         }
    //
    //         let testsByTechId = [];
    //         if (techNames.length > 0) {
    //             for (const techName of techNames) {
    //                 let techId = techName.id;
    //
    //                 try {
    //                     testsByTechId.push(await testsServices.getRecommendationTests(techId));
    //                 } catch (e) {
    //                     console.error(e);
    //                 }
    //
    //             }
    //
    //         }
    //
    //         let recommendationTestsId = [];
    //         if (testsByTechId?.length > 0) {
    //             recommendationTestsId = sort(testsByTechId);
    //         }
    //
    //         if (recommendationTestsId.length) {
    //             for (const recId of recommendationTestsId) {
    //                 try {
    //                     fullRecommendationTests.push(await testsServices.getOneTest(recId));
    //                 } catch (e) {
    //                     console.error(e);
    //                 }
    //             }
    //         }
    //     }
    //
        resolve();
        // resolve({fullRecommendationTests});
    //
    });

}
