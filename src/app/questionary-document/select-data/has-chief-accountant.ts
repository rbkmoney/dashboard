import { AccountantInfo } from '../../api-codegen/questionary';
import { YesNo, toYesNo } from './yes-no';

export function hasChiefAccountant(accountantInfo: AccountantInfo): YesNo {
    return toYesNo(
        accountantInfo &&
            accountantInfo.accountantInfoType === AccountantInfo.AccountantInfoTypeEnum.WithChiefAccountant
    );
}
