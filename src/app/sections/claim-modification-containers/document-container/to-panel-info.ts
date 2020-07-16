import isEmpty from 'lodash.isempty';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isRussianIndividualEntityContractor, isRussianLegalEntityContractor } from '../../../api';
import {
    BankAccount,
    ContactInfo,
    Contractor,
    LegalOwnerInfo,
    QuestionaryData,
    RussianIndividualEntity,
    ShopInfo,
} from '../../../api-codegen/questionary';
import { OrgInfo } from './org-info';

export type PanelInfoType =
    | 'shopInfo'
    | 'bankAccountInfo'
    | 'legalOwnerInfo'
    | 'individualEntityInfo'
    | 'orgInfo'
    | 'contactInfo';

export interface PanelInfo {
    type: PanelInfoType;
    item: ShopInfo | BankAccount | LegalOwnerInfo | RussianIndividualEntity | OrgInfo | ContactInfo;
}

const contractorToPanelInfo = (contractor: Contractor): PanelInfo => {
    if (isRussianIndividualEntityContractor(contractor)) {
        return { type: 'individualEntityInfo', item: contractor.individualEntity };
    } else if (isRussianLegalEntityContractor(contractor)) {
        return { type: 'legalOwnerInfo', item: contractor.legalEntity.legalOwnerInfo };
    }
    console.error('Unknown contractor');
    return null;
};

const contractorToEntity = (contractor: Contractor) => {
    if (isRussianIndividualEntityContractor(contractor)) {
        return contractor.individualEntity;
    } else if (isRussianLegalEntityContractor(contractor)) {
        return contractor.legalEntity;
    }
    console.error('Unknown contractor');
    return null;
};

const contractorToOrgInfo = (contractor: Contractor): PanelInfo => {
    const entity = contractorToEntity(contractor);
    if (entity) {
        const { additionalInfo, name, inn, registrationInfo } = entity;
        return { type: 'orgInfo', item: { additionalInfo, name, inn, registrationInfo } };
    }
    console.error('Unknown contractor');
    return null;
};

export const toPanelInfo = (s: Observable<QuestionaryData>): Observable<PanelInfo[]> =>
    s.pipe(
        map((data) => {
            const panelInfo: PanelInfo[] = [];
            if (data.contractor) {
                panelInfo.push(contractorToOrgInfo(data.contractor), contractorToPanelInfo(data.contractor));
            }
            panelInfo.push(
                { type: 'shopInfo', item: data.shopInfo },
                { type: 'bankAccountInfo', item: data.bankAccount },
                { type: 'contactInfo', item: data.contactInfo }
            );
            return panelInfo.filter((e) => !isEmpty(e?.item));
        })
    );
