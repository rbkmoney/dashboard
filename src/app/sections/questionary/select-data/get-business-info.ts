import { hasChiefAccountant } from './has-chief-accountant';
import { AdditionalInfo, AccountantInfo, WithoutChiefAccountingOrganization } from '../../../api-codegen/questionary';
import { YesNo } from './yes-no';

export interface BusinessInfo {
    hasChiefAccountant: YesNo;
    staffCount: number;
    accounting: AccountantInfo.AccountantInfoTypeEnum;
    accountingOrgInn?: string;
}

export function getBusinessInfo(additionalInfo: AdditionalInfo): BusinessInfo {
    const { accountantInfo } = additionalInfo;
    const accounting = accountantInfo.accountantInfoType;
    const businessInfo: BusinessInfo = {
        hasChiefAccountant: hasChiefAccountant(accountantInfo),
        staffCount: additionalInfo.staffCount,
        accounting
    };
    if (accounting === AccountantInfo.AccountantInfoTypeEnum.WithoutChiefAccountingOrganization) {
        businessInfo.accountingOrgInn = (accountantInfo as WithoutChiefAccountingOrganization).inn;
    }
    return businessInfo;
}
