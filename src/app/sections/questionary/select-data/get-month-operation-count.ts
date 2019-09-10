import { MonthOperationCount as MonthOperationCountEnum } from '../../../api-codegen/questionary';

export enum MonthOperationCount {
    LtTen,
    BtwTenToFifty,
    GtFifty
}

export function getMonthOperationCount(monthOperationCount: MonthOperationCountEnum): MonthOperationCount {
    switch (monthOperationCount) {
        case MonthOperationCountEnum.GtFifty:
            return MonthOperationCount.GtFifty;
        case MonthOperationCountEnum.BtwTenToFifty:
            return MonthOperationCount.BtwTenToFifty;
        case MonthOperationCountEnum.LtTen:
            return MonthOperationCount.LtTen;
    }
    return null;
}
