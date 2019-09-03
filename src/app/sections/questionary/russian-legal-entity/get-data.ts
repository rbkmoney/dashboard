import {
    Questionary,
    LegalEntityContractor,
    RussianLegalEntity,
    QuestionaryData
} from '../../../api-codegen/questionary';
import { Replace } from '../replace';

type RussianLegalEntityQuestionary = Replace<
    Questionary,
    {
        data: Replace<
            QuestionaryData,
            { contractor: Replace<LegalEntityContractor, { legalEntity: RussianLegalEntity }> }
        >;
    }
>;

export function getData({ data }: RussianLegalEntityQuestionary) {
    return {
        basic: {
            inn: data.contractor.legalEntity.inn,
            name: data.shopInfo.details.name,
            brandName: data.contractor.legalEntity.name
        },
        contact: {
            phone: data.contactInfo.phoneNumber,
            url: '',
            email: data.contactInfo.email
        }
    };
}
