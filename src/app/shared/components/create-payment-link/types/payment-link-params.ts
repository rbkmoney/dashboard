export interface PaymentLinkParams {
    invoiceID?: string;
    invoiceAccessToken?: string;
    invoiceTemplateID?: string;
    invoiceTemplateAccessToken?: string;
    name?: string;
    description?: string;
    email?: string;
    redirectUrl?: string;
    paymentFlowHold?: boolean;
    holdExpiration?: string;
    terminals?: boolean;
    wallets?: boolean;
    bankCard?: boolean;
    mobileCommerce?: boolean;
    applePay?: boolean;
    googlePay?: boolean;
    samsungPay?: boolean;
    yandexPay?: boolean;
}
