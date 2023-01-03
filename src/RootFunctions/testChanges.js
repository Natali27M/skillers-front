import {codeTestServices, testsServices} from '../services';

export default async function testChanges() {
    let firstTestsData = await codeTestServices.getAllCodeTestsPaginated(1);
    let testsArray = firstTestsData.data;
    for (let i = 2; i <= firstTestsData?.meta?.pagination?.pageCount; i++) {
        const testData = await codeTestServices.getAllCodeTestsPaginated(i);
        testsArray = testsArray.concat(testData.data);
    }


    const makeEng = (testId) => {
        return new Promise(async (resolve) => {
            codeTestServices.updateTest(testId, {ukrLng: false}).then(resolve());
        });
    };

    const forAllTests = async () => {
        for (const test of testsArray) {
            await makeEng(test.id);
        }
    };


    await forAllTests()
}