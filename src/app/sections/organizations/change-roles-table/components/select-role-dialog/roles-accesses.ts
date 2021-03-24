import { RoleId } from '@dsh/api-codegen/organizations';

import { RoleAccess } from './types/role-access';
import { RoleAccessName } from './types/role-access-name';

export const ROLES_ACCESSES: RoleAccess[] = [
    {
        name: RoleAccessName.payments,
        isHeader: true,
    },
    {
        name: RoleAccessName.viewAnalytics,
        availableRoles: [RoleId.Administrator, RoleId.Manager],
    },
    {
        name: RoleAccessName.viewInvoices,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.viewPayments,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.viewRefunds,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.viewPayouts,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant],
    },
    {
        name: RoleAccessName.viewApiKey,
        availableRoles: [RoleId.Administrator, RoleId.Integrator],
    },
    {
        name: RoleAccessName.manageReports,
        availableRoles: [RoleId.Administrator, RoleId.Accountant],
    },
    {
        name: RoleAccessName.manageWebhooks,
        availableRoles: [RoleId.Administrator, RoleId.Integrator],
    },
    {
        name: RoleAccessName.createInvoice,
        availableRoles: [RoleId.Administrator, RoleId.Manager],
    },
    {
        name: RoleAccessName.createPaymentLink,
        availableRoles: [RoleId.Administrator, RoleId.Manager],
    },
    {
        name: RoleAccessName.createRefund,
        availableRoles: [RoleId.Administrator, RoleId.Accountant],
    },
    {
        name: RoleAccessName.wallets,
        isHeader: true,
        availableRoles: [RoleId.Administrator, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.claims,
        isHeader: true,
        availableRoles: [RoleId.Administrator],
    },
    {
        name: RoleAccessName.manageOrganizations,
        isHeader: true,
        availableRoles: [RoleId.Administrator],
    },
];
