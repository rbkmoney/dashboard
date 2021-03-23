import { RoleId } from '@dsh/api-codegen/organizations';

export const ROLES_ACCESSES: {
    name: string;
    isHeader?: boolean;
    access: { [R in RoleId]?: boolean };
}[] = [
    {
        name: 'payments',
        isHeader: true,
        access: {},
    },
    {
        name: 'viewAnalytics',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: true,
            [RoleId.Accountant]: false,
            [RoleId.Integrator]: false,
        },
    },
    {
        name: 'viewInvoices',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: true,
            [RoleId.Accountant]: true,
            [RoleId.Integrator]: true,
        },
    },
    {
        name: 'viewPayments',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: true,
            [RoleId.Accountant]: true,
            [RoleId.Integrator]: true,
        },
    },
    {
        name: 'viewRefunds',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: true,
            [RoleId.Accountant]: true,
            [RoleId.Integrator]: true,
        },
    },
    {
        name: 'viewPayouts',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: true,
            [RoleId.Accountant]: true,
            [RoleId.Integrator]: false,
        },
    },
    {
        name: 'viewApiKey',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: false,
            [RoleId.Accountant]: false,
            [RoleId.Integrator]: true,
        },
    },
    {
        name: 'manageReports',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: false,
            [RoleId.Accountant]: true,
            [RoleId.Integrator]: false,
        },
    },
    {
        name: 'manageWebhooks',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: false,
            [RoleId.Accountant]: false,
            [RoleId.Integrator]: true,
        },
    },
    {
        name: 'createInvoice',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: true,
            [RoleId.Accountant]: false,
            [RoleId.Integrator]: false,
        },
    },
    {
        name: 'createPaymentLink',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: true,
            [RoleId.Accountant]: false,
            [RoleId.Integrator]: false,
        },
    },
    {
        name: 'createRefund',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: false,
            [RoleId.Accountant]: true,
            [RoleId.Integrator]: false,
        },
    },
    {
        name: 'wallets',
        isHeader: true,
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: false,
            [RoleId.Accountant]: true,
            [RoleId.Integrator]: true,
        },
    },
    {
        name: 'claims',
        isHeader: true,
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: false,
            [RoleId.Accountant]: false,
            [RoleId.Integrator]: false,
        },
    },
    {
        name: 'manageOrganizations',
        access: {
            [RoleId.Administrator]: true,
            [RoleId.Manager]: false,
            [RoleId.Accountant]: false,
            [RoleId.Integrator]: false,
        },
    },
];
