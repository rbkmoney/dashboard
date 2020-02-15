import { DateUnit } from './date-unit';
import { DaterangeUnitEnum } from './daterange-unit-enum';

export interface SelectorItem {
    value: DateUnit | DaterangeUnitEnum.more;
    checked: boolean;
}
