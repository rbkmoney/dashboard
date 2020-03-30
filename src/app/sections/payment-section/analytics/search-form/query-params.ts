import { Period } from '@dsh/components/form-controls';

export interface QueryParams {
    fromTime: string;
    toTime: string;
    period: Period;
    shopIDs?: string[];
}
