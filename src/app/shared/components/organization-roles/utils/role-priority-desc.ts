import { RoleId } from '@dsh/api-codegen/organizations';

export const ROLE_PRIORITY_DESC: Record<RoleId, number> = {
    Administrator: 0,
    Manager: 1,
    Accountant: 2,
    Integrator: 3,
};
