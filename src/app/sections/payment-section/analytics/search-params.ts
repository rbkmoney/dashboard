import { Period } from '../../../form-controls/range-datepicker';

export interface SearchParams {
    fromTime: Date;
    toTime: Date;
    period: Period;
    shopIDs?: string[];
}
