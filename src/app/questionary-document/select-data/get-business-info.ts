import { hasChiefAccountant } from './has-chief-accountant';
import { AdditionalInfo, AccountantInfo, WithoutChiefAccountingOrganization } from '../../api-codegen/questionary';
import { YesNo } from './yes-no';
import { toOptional } from '../../../utils';

export interface BusinessInfo {
    hasChiefAccountant: YesNo;
    staffCount: number;
    accounting: AccountantInfo.AccountantInfoTypeEnum;
    accountingOrgInn?: string;
}

function isWithoutChiefAccountingOrganization(
    accountantInfo: AccountantInfo
): accountantInfo is WithoutChiefAccountingOrganization {
    return (
        accountantInfo &&
        accountantInfo.accountantInfoType === AccountantInfo.AccountantInfoTypeEnum.WithoutChiefAccountingOrganization
    );
}

export function getBusinessInfo(additionalInfo: AdditionalInfo): BusinessInfo {
    const { accountantInfo, staffCount } = toOptional(additionalInfo);
    return {
        hasChiefAccountant: hasChiefAccountant(accountantInfo),
        staffCount,
        accounting: toOptional(accountantInfo).accountantInfoType,
        accountingOrgInn: isWithoutChiefAccountingOrganization(accountantInfo) ? toOptional(accountantInfo).inn : null
    };
}
