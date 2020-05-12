import { Period } from '@dsh/components/form-controls';

export interface SearchParams {
    fromTime: string;
    toTime: string;
    period: Period;
    shopIDs?: string[];
}
