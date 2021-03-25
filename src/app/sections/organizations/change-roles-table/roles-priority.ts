import { RoleId } from '@dsh/api-codegen/organizations';

export const ROLES_PRIORITY = {
    [RoleId.Administrator]: 4,
    [RoleId.Manager]: 3,
    [RoleId.Accountant]: 2,
    [RoleId.Integrator]: 1,
};
