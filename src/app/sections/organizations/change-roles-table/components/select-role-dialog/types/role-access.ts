import { RoleId } from '@dsh/api-codegen/organizations';

export interface RoleAccess {
    name: string;
    isHeader?: boolean;
    availableRoles?: RoleId[];
}
