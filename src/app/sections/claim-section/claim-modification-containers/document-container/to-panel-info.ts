import isEmpty from 'lodash-es/isEmpty';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
} from '@dsh/api-codegen/questionary';
import {
    isInternationalLegalEntityContractor,
    isRussianIndividualEntityContractor,
    isRussianLegalEntityContractor,
} from '@dsh/api/questionary';

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
            case 'russianLegalEntity': {
                const { additionalInfo, name, inn, registrationInfo } = entity as RussianIndividualEntity;
                return { type: 'orgInfo', item: { additionalInfo, name, inn, registrationInfo } };
            }
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
            switch (data?.contractor?.contractorType) {
                case 'IndividualEntityContractor':
                    panelInfo.push(contractorToOrgInfo(data.contractor), contractorToPanelInfo(data.contractor));
                    break;
                case 'LegalEntityContractor':
                    if (
                        (data.contractor as LegalEntityContractor).legalEntity.legalEntityType ===
                        'InternationalLegalEntity'
                    ) {
                        panelInfo.push(contractorToPanelInfo(data.contractor));
                    }
                    break;
            }
            panelInfo.push({ type: 'shopInfo', item: data.shopInfo }, { type: 'contactInfo', item: data.contactInfo });
            switch (data?.bankAccount?.bankAccountType) {
                case 'RussianBankAccount':
                    panelInfo.push({ type: 'bankAccountInfo', item: data.bankAccount });
                    break;
                case 'InternationalBankAccount':
                    panelInfo.push({ type: 'internationalBankAccountInfo', item: data.bankAccount });
                    break;
            }
            return panelInfo.filter((e) => !isEmpty(e?.item));
        })
    );
