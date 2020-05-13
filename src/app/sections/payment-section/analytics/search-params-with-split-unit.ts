import { SplitUnit } from '../../../api-codegen/anapi/swagger-codegen';

export interface SearchParamsWithSplitUnit {
    fromTime: string;
    toTime: string;
    splitUnit: SplitUnit;
    shopIDs?: string[];
}