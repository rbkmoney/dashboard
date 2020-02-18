import { DaterangeUnitEnum } from './daterange-unit-enum';

export type DateUnit =
    | DaterangeUnitEnum.today
    | DaterangeUnitEnum.week
    | DaterangeUnitEnum.month
    | DaterangeUnitEnum.year;
