import { AccountantInfo, WithoutChiefAccountant } from '../../../api-codegen/questionary';

export enum AccountingType {
    AccountingOrganization,
    HeadAccounting,
    IndividualAccountant
}

export function getAccountingType(accountantInfo: AccountantInfo): AccountingType {
    switch (accountantInfo.accountantInfoType) {
        case AccountantInfo.AccountantInfoTypeEnum.WithoutChiefAccountant:
            switch ((accountantInfo as WithoutChiefAccountant).withoutChiefAccountantType) {
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.AccountingOrganization:
                    return AccountingType.AccountingOrganization;
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.HeadAccounting:
                    return AccountingType.HeadAccounting;
                case WithoutChiefAccountant.WithoutChiefAccountantTypeEnum.IndividualAccountant:
                    return AccountingType.IndividualAccountant;
            }
    }
    return null;
}
