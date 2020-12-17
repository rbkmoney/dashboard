import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';

export interface SearchFiltersParams {
    fromTime: string;
    toTime: string;
    invoiceIDs: string[];
    shopIDs?: string[];
    invoiceStatus?: Invoice.StatusEnum;
}
