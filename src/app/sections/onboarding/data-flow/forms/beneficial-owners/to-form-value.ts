import get from 'lodash.get';
import * as moment from 'moment';

import { QuestionaryData, Contractor, BeneficialOwner } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { toRussianDomesticPassport, toResidencyInfo, toPdlInfo } from '../subforms';

const extractBeneficialOwner = (c: Contractor): BeneficialOwner[] => {
    switch (get(c, ['contractorType'])) {
        case 'IndividualEntityContractor':
            return get(c, ['individualEntity', 'beneficialOwners'], []);
        case 'LegalEntityContractor':
            return get(c, ['legalEntity', 'beneficialOwner'], []);
    }
};

export const toFormValue = (d: QuestionaryData): FormValue => ({
    beneficialOwners: extractBeneficialOwner(get(d, ['contractor'])).map(owner => ({
        ownershipPercentage: get(owner, ['ownershipPercentage'], null),
        privateEntityInfo: {
            birthDate: get(
                owner,
                ['russianPrivateEntity', 'birthDate'],
                moment()
                    .utc()
                    .format()
            ),
            birthPlace: get(owner, ['russianPrivateEntity', 'birthPlace'], null),
            residenceAddress: get(owner, ['russianPrivateEntity', 'residenceAddress'], null),
            snils: get(owner, ['snils'], null),
            innfl: get(owner, ['inn'], null)
        },
        russianDomesticPassport: toRussianDomesticPassport(get(owner, ['identityDocument'], null)),
        pdlInfo: toPdlInfo(owner),
        individualResidencyInfo: toResidencyInfo(get(owner, ['residencyInfo']))
    }))
});
