import { RoleId } from '@dsh/api-codegen/organizations';

import { RoleAccess } from './types/role-access';

export const ROLES_ACCESSES: RoleAccess[] = [
    {
        name: 'payments',
        isHeader: true,
    },
    {
        name: 'viewAnalytics',
        availableRoles: [RoleId.Administrator, RoleId.Manager],
    },
    {
        name: 'viewInvoices',
        availableRoles: [RoleId.Administrator, RoleId.Manager,RoleId.Accountant, RoleId.Integrator]
    },
    {
        name: 'viewPayments',
        availableRoles: [RoleId.Administrator, RoleId.Manager,RoleId.Accountant, RoleId.Integrator]
    },
    {
        name: 'viewRefunds',
        availableRoles: [RoleId.Administrator, RoleId.Manager,RoleId.Accountant, RoleId.Integrator]
    },
    {
        name: 'viewPayouts',
        availableRoles: [RoleId.Administrator, RoleId.Manager,RoleId.Accountant]
    },
    {
        name: 'viewApiKey',
        availableRoles: [RoleId.Administrator, RoleId.Integrator]
    },
    {
        name: 'manageReports',
        availableRoles: [RoleId.Administrator, RoleId.Accountant]
    },
    {
        name: 'manageWebhooks',
        availableRoles: [RoleId.Administrator,  RoleId.Integrator]
    },
    {
        name: 'createInvoice',
        availableRoles: [RoleId.Administrator, RoleId.Manager]
    },
    {
        name: 'createPaymentLink',
        availableRoles: [RoleId.Administrator, RoleId.Manager]
    },
    {
        name: 'createRefund',
        availableRoles: [RoleId.Administrator, RoleId.Accountant, ]
    },
    {
        name: 'wallets',
        isHeader: true,
        availableRoles: [RoleId.Administrator, RoleId.Accountant, RoleId.Integrator]
    },
    {
        name: 'claims',
        isHeader: true,
        availableRoles: [RoleId.Administrator]
    },
    {
        name: 'manageOrganizations',
        isHeader: true,
        availableRoles: [RoleId.Administrator]
    },
];
