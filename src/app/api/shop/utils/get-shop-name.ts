import { Shop } from '../../../api-codegen/anapi/swagger-codegen';

export const getShopName = (s: Shop | null): string | null => (s ? s.details.name : null);
