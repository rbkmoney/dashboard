import { getAccountingType, AccountingType } from './get-accounting-type';
import { hasChiefAccountant } from './has-chief-accountant';
import { AccountingOrganization, AdditionalInfo } from '../../../api-codegen/questionary';
import { YesNo } from './yes-no';

export interface BusinessInfo {
    hasChiefAccountant: YesNo;
    staffCount: number;
    accounting: AccountingType;
    accountingOrgInn?: string;
}

export function getBusinessInfo(additionalInfo: AdditionalInfo): BusinessInfo {
    const { accountantInfo } = additionalInfo;
    const accounting = getAccountingType(accountantInfo);
    const businessInfo: BusinessInfo = {
        hasChiefAccountant: hasChiefAccountant(accountantInfo),
        staffCount: additionalInfo.staffCount,
        accounting
    };
    if (accounting === AccountingType.AccountingOrganization) {
        businessInfo.accountingOrgInn = (accountantInfo as AccountingOrganization).inn;
    }
    return businessInfo;
}
