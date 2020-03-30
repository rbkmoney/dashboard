import { SplitUnit } from '../../../api-codegen/anapi/swagger-codegen';

export interface SearchParamsWithSplitUnit {
    fromTime: Date;
    toTime: Date;
    splitUnit: SplitUnit;
    shopIDs?: string[];
}
