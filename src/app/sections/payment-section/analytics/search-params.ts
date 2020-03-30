import { Period } from '@dsh/components/form-controls';

export interface SearchParams {
    fromTime: Date;
    toTime: Date;
    period: Period;
    shopIDs?: string[];
}
