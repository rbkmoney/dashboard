import { RoleId } from '@dsh/api-codegen/organizations';

export interface RoleAccessItem {
    name: string;
    isHeader?: boolean;
    availableRoles?: RoleId[];
}
