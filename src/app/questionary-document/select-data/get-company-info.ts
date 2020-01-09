import get from 'lodash.get';

import { Questionary } from '../../api-codegen/questionary';
import { isRussianLegalEntityQuestionary, isRussianIndividualEntityQuestionary } from '../../api';

export function getCompanyInfo(questionary: Questionary): { companyName: string; companyInn: string } {
    if (isRussianIndividualEntityQuestionary(questionary)) {
        return {
            companyName: get(questionary.data, ['shopInfo', 'details', 'name'], ''),
            companyInn: questionary.data.contractor.individualEntity.inn
        };
    } else if (isRussianLegalEntityQuestionary(questionary)) {
        return {
            companyName: get(questionary.data, ['shopInfo', 'details', 'name'], ''),
            companyInn: questionary.data.contractor.legalEntity.inn
        };
    }
    console.error('Unknown questionary');
    return null;
}
