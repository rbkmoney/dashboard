import get from 'lodash.get';

import { ResidencyInfo, IndividualResidencyInfo } from '../../api-codegen/questionary';

export function getIndividualResidencyInfo(
    residencyInfo: ResidencyInfo
): {
    usaTaxResident: boolean;
    exceptUsaTaxResident: boolean;
} {
    if (get(residencyInfo, 'residencyInfoType') === 'IndividualResidencyInfo') {
        const { usaTaxResident, exceptUsaTaxResident } = residencyInfo as IndividualResidencyInfo;
        return {
            usaTaxResident,
            exceptUsaTaxResident
        };
    }
    console.error("ResidencyInfo isn't IndividualResidencyInfo");
    return null;
}
