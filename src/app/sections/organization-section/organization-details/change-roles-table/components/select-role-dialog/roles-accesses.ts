import { RoleId } from '@dsh/api-codegen/organizations';

import { RoleAccess } from './types/role-access';
import { RoleAccessName } from './types/role-access-name';

export const ROLES_ACCESSES: RoleAccess[] = [
    {
        name: RoleAccessName.Payments,
        isHeader: true,
    },
    {
        name: RoleAccessName.ViewAnalytics,
        availableRoles: [RoleId.Administrator, RoleId.Manager],
    },
    {
        name: RoleAccessName.ViewInvoices,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.ViewPayments,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.ViewRefunds,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.ViewPayouts,
        availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant],
    },
    {
        name: RoleAccessName.ViewApiKey,
        availableRoles: [RoleId.Administrator, RoleId.Integrator],
    },
    {
        name: RoleAccessName.ManageReports,
        availableRoles: [RoleId.Administrator, RoleId.Accountant],
    },
    {
        name: RoleAccessName.ManageWebhooks,
        availableRoles: [RoleId.Administrator, RoleId.Integrator],
    },
    {
        name: RoleAccessName.CreateInvoice,
        availableRoles: [RoleId.Administrator, RoleId.Manager],
    },
    {
        name: RoleAccessName.CreatePaymentLink,
        availableRoles: [RoleId.Administrator, RoleId.Manager],
    },
    {
        name: RoleAccessName.CreateRefund,
        availableRoles: [RoleId.Administrator, RoleId.Accountant],
    },
    {
        name: RoleAccessName.Wallets,
        isHeader: true,
        availableRoles: [RoleId.Administrator, RoleId.Accountant, RoleId.Integrator],
    },
    {
        name: RoleAccessName.Claims,
        isHeader: true,
        availableRoles: [RoleId.Administrator],
    },
    {
        name: RoleAccessName.ManageOrganizations,
        isHeader: true,
        availableRoles: [RoleId.Administrator],
    },
];
