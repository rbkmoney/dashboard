import { RoleId } from '@dsh/api-codegen/organizations';

export interface ShopsRole {
    id: RoleId;
    shopIds: string[];
}
