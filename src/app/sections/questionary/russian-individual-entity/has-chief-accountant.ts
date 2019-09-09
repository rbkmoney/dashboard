import { AccountantInfo } from '../../../api-codegen/questionary';
import { YesNo } from '../yes-no';

export function hasChiefAccountant(accountantInfo: AccountantInfo): YesNo {
    return accountantInfo.accountantInfoType === AccountantInfo.AccountantInfoTypeEnum.WithChiefAccountant
        ? YesNo.yes
        : YesNo.no;
}
