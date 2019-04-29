export enum Roles {
    InvoicesPaymentsRead = 'invoices.*.payments:read',
    CustomersBindingsRead = 'customers.*.bindings:read',
    PartyRead = 'party:read',
    InvoicesRead = 'invoices:read',
    PayoutsWrite = 'payouts:write',
    PaymentResourcesWrite = 'payment_resources:write',
    PayoutsRead = 'payouts:read',
    CustomersWrite = 'customers:write',
    InvoicesPaymentsWrite = 'invoices.*.payments:write',
    InvoicesWrite = 'invoices:write',
    PartyWrite = 'party:write',
    CustomersRead = 'customers:read',
    CustomersBindingsWrite = 'customers.*.bindings:write'
}
