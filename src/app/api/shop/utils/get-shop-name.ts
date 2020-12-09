import { Shop } from '@dsh/api-codegen/capi';

export const getShopName = (s: Shop | null): string | null => (s ? s.details.name : null);
