import {resultsServices} from '../services/results.services';

export default async function badgesProcessing({userid}) {
    const result = await resultsServices.getUserResultWithTechId(65, 1);

}