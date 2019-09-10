import { MonthOperationSum as MonthOperationSumEnum } from '../../../api-codegen/questionary';

export enum MonthOperationSum {
    LtFiveHundredThousand,
    BtwFiveHundredThousandToOneMillion,
    GtOneMillion
}

export function getMonthOperationSum(monthOperationSum: MonthOperationSumEnum): MonthOperationSum {
    switch (monthOperationSum) {
        case MonthOperationSumEnum.GtOneMillion:
            return MonthOperationSum.GtOneMillion;
        case MonthOperationSumEnum.BtwFiveHundredThousandToOneMillion:
            return MonthOperationSum.BtwFiveHundredThousandToOneMillion;
        case MonthOperationSumEnum.LtFiveHundredThousand:
            return MonthOperationSum.LtFiveHundredThousand;
    }
    return null;
}
