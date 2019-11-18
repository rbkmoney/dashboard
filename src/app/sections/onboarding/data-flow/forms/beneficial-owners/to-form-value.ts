import get from 'lodash.get';
import * as moment from 'moment';

import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';

export const toFormValue = (d: QuestionaryData): FormValue => {
    const beneficialOwner = get(d, ['contractor', 'legalEntity', 'beneficialOwner'], []);
    return {
        beneficialOwners: beneficialOwner.map(owner => {
            return {
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
                russianDomesticPassport: {
                    seriesNumber: get(owner, ['identityDocument', 'seriesNumber'], null),
                    issuer: get(owner, ['identityDocument', 'issuer'], null),
                    issuerCode: get(owner, ['identityDocument', 'issuerCode'], null),
                    issuedAt: get(
                        owner,
                        ['identityDocument', 'issuedAt'],
                        moment()
                            .utc()
                            .format()
                    )
                },
                pdlInfo: {
                    pdlCategory: get(owner, ['pdlCategory'], false),
                    pdlRelationDegree: get(owner, ['pdlRelationDegree'], null)
                },
                usaTaxResident: get(owner, ['residencyInfo', 'taxResident'], false),
                exceptUsaTaxResident: get(owner, ['residencyInfo', 'ownerResident'], false)
            };
        })
    };
};
