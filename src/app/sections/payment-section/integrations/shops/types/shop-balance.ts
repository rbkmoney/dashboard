import { AmountResult } from '@dsh/api-codegen/anapi/swagger-codegen';

export interface ShopBalance {
    id: string;
    data: AmountResult | null;
}
