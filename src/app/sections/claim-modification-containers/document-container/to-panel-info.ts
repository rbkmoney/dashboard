import isEmpty from 'lodash.isempty';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    isInternationalLegalEntityContractor,
    isRussianIndividualEntityContractor,
    isRussianLegalEntityContractor,
} from '../../../api';
import {
    BankAccount,
    ContactInfo,
    Contractor,
    IndividualEntityContractor,
    InternationalLegalEntity,
    LegalEntityContractor,
    LegalOwnerInfo,
    QuestionaryData,
    RussianIndividualEntity,
    RussianLegalEntity,
    ShopInfo,
} from '../../../api-codegen/questionary';
import { OrgInfo } from './org-info';

export type PanelInfoType =
    | 'shopInfo'
    | 'bankAccountInfo'
    | 'legalOwnerInfo'
    | 'individualEntityInfo'
    | 'internationalLegalEntity'
    | 'internationalBankAccountInfo'
    | 'correspondentAccountInfo'
    | 'orgInfo'
    | 'contactInfo';

export interface PanelInfo {
    type: PanelInfoType;
    item:
        | ShopInfo
        | BankAccount
        | LegalOwnerInfo
        | RussianIndividualEntity
        | InternationalLegalEntity
        | OrgInfo
        | ContactInfo;
}

const contractorToPanelInfo = (contractor: Contractor): PanelInfo => {
    switch (true) {
        case isRussianIndividualEntityContractor(contractor):
            return { type: 'individualEntityInfo', item: (contractor as IndividualEntityContractor).individualEntity };
        case isRussianLegalEntityContractor(contractor):
            return {
                type: 'legalOwnerInfo',
                item: ((contractor as LegalEntityContractor).legalEntity as RussianLegalEntity).legalOwnerInfo,
            };
        case isInternationalLegalEntityContractor(contractor):
            return { type: 'internationalLegalEntity', item: (contractor as LegalEntityContractor).legalEntity };
        default:
            console.error('Unknown contractor');
            return null;
    }
};

const contractorToEntity = (contractor: Contractor) => {
    switch (true) {
        case isRussianIndividualEntityContractor(contractor):
            return {
                type: 'russianIndividualEntity',
                entity: (contractor as IndividualEntityContractor).individualEntity,
            };
        case isRussianLegalEntityContractor(contractor):
            return { type: 'russianLegalEntity', entity: (contractor as LegalEntityContractor).legalEntity };
        case isInternationalLegalEntityContractor(contractor):
            return { type: 'internationalLegalEntity', entity: (contractor as LegalEntityContractor).legalEntity };
        default:
            console.error('Unknown contractor');
            return null;
    }
};

const contractorToOrgInfo = (contractor: Contractor): PanelInfo => {
    const { type, entity } = contractorToEntity(contractor);
    if (entity) {
        switch (type) {
            case 'russianIndividualEntity':
            case 'russianLegalEntity':
                const { additionalInfo, name, inn, registrationInfo } = entity as RussianIndividualEntity;
                return { type: 'orgInfo', item: { additionalInfo, name, inn, registrationInfo } };
            default:
                console.error('Unknown contractor');
                return null;
        }
    }
    console.error('Unknown contractor');
    return null;
};

export const toPanelInfo = (s: Observable<QuestionaryData>): Observable<PanelInfo[]> =>
    s.pipe(
        map((data) => {
            const panelInfo: PanelInfo[] = [];
            switch (true) {
                case data.contractor.contractorType === 'IndividualEntityContractor':
                    panelInfo.push(contractorToOrgInfo(data.contractor), contractorToPanelInfo(data.contractor));
                    break;
                case data.contractor.contractorType === 'LegalEntityContractor' &&
                    (data.contractor as LegalEntityContractor).legalEntity.legalEntityType ===
                        'InternationalLegalEntity':
                    panelInfo.push(contractorToPanelInfo(data.contractor));
                    break;
            }
            panelInfo.push({ type: 'shopInfo', item: data.shopInfo }, { type: 'contactInfo', item: data.contactInfo });
            if (data.bankAccount.bankAccountType === 'RussianBankAccount') {
                panelInfo.push({ type: 'bankAccountInfo', item: data.bankAccount });
            }
            if (data.bankAccount.bankAccountType === 'InternationalBankAccount') {
                panelInfo.push({ type: 'internationalBankAccountInfo', item: data.bankAccount });
            }
            return panelInfo.filter((e) => !isEmpty(e?.item));
        })
    );
