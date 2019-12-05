import {
    LegalEntityContractor,
    IndividualEntityContractor,
    IndividualEntity,
    LegalEntity,
    RussianIndividualEntity,
    RussianLegalEntity
} from '../../../../../api-codegen/questionary';
import { Replace } from '../../../../../../type-utils';
import { PartyContent } from '../../../../../api-codegen/aggr-proxy';

export const toIndividualEntityContractor = ({
    inn
}: PartyContent): Replace<IndividualEntityContractor, { individualEntity: RussianIndividualEntity }> => ({
    contractorType: 'IndividualEntityContractor',
    individualEntity: {
        individualEntityType: IndividualEntity.IndividualEntityTypeEnum.RussianIndividualEntity,
        inn
    }
});

export const toLegalEntityContractor = ({
    inn
}: PartyContent): Replace<LegalEntityContractor, { legalEntity: RussianLegalEntity }> => ({
    contractorType: 'LegalEntityContractor',
    legalEntity: {
        legalEntityType: LegalEntity.LegalEntityTypeEnum.RussianLegalEntity,
        inn
    }
});
