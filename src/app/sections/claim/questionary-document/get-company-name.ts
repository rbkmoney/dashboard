import get from 'lodash.get';

import { Questionary } from '../../../api-codegen/questionary';

export function getCompanyName(questionary: Questionary): string {
    return get(questionary, ['data', 'shopInfo', 'details', 'name'], null);
}
