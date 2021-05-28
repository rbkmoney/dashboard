import { TranslocoConfig, TranslocoTestingModule } from '@ngneat/transloco';

import actionbar from '../../../assets/i18n/actionbar/ru.json';
import apiKey from '../../../assets/i18n/api-key/ru.json';
import apiModelDetails from '../../../assets/i18n/api-model-details/ru.json';
import apiModelTypes from '../../../assets/i18n/api-model-types/ru.json';
import claimModificationContainers from '../../../assets/i18n/claim-modification-containers/ru.json';
import claim from '../../../assets/i18n/claim/ru.json';
import claims from '../../../assets/i18n/claims/ru.json';
import createInvoiceTemplate from '../../../assets/i18n/create-invoice-template/ru.json';
import createInvoice from '../../../assets/i18n/create-invoice/ru.json';
import createPaymentLink from '../../../assets/i18n/create-payment-link/ru.json';
import createShop from '../../../assets/i18n/create-shop/ru.json';
import currencyFilter from '../../../assets/i18n/currency-filter/ru.json';
import dadata from '../../../assets/i18n/dadata/ru.json';
import daterangeFilter from '../../../assets/i18n/daterange-filter/ru.json';
import daterange from '../../../assets/i18n/daterange/ru.json';
import depositInfo from '../../../assets/i18n/deposit-info/ru.json';
import deposits from '../../../assets/i18n/deposits/ru.json';
import fileUploader from '../../../assets/i18n/file-uploader/ru.json';
import filterShops from '../../../assets/i18n/filter-shops/ru.json';
import invoiceDetails from '../../../assets/i18n/invoice-details/ru.json';
import invoice from '../../../assets/i18n/invoice/ru.json';
import invoicesFilter from '../../../assets/i18n/invoices-filter/ru.json';
import invoices from '../../../assets/i18n/invoices/ru.json';
import main from '../../../assets/i18n/main/ru.json';
import onboarding from '../../../assets/i18n/onboarding/ru.json';
import operations from '../../../assets/i18n/operations/ru.json';
import organizations from '../../../assets/i18n/organizations/ru.json';
import paymentDetails from '../../../assets/i18n/payment-details/ru.json';
import paymentInfo from '../../../assets/i18n/payment-info/ru.json';
import paymentLink from '../../../assets/i18n/payment-link/ru.json';
import paymentSection from '../../../assets/i18n/payment-section/ru.json';
import payouts from '../../../assets/i18n/payouts/ru.json';
import rangeDatepicker from '../../../assets/i18n/range-datepicker/ru.json';
import refundDetails from '../../../assets/i18n/refund-details/ru.json';
import refundStatusFilter from '../../../assets/i18n/refund-status-filter/ru.json';
import reports from '../../../assets/i18n/reports/ru.json';
import ru from '../../../assets/i18n/ru.json';
import shopSelector from '../../../assets/i18n/shop-selector/ru.json';
import shops from '../../../assets/i18n/shops/ru.json';
import testEnvBanner from '../../../assets/i18n/test-env-banner/ru.json';
import toolbar from '../../../assets/i18n/toolbar/ru.json';
import walletDetails from '../../../assets/i18n/wallet-details/ru.json';
import walletSection from '../../../assets/i18n/wallet-section/ru.json';
import walletWebhooks from '../../../assets/i18n/wallet-webhooks/ru.json';
import wallets from '../../../assets/i18n/wallets/ru.json';
import webhook from '../../../assets/i18n/webhook/ru.json';
import withdrawalInfo from '../../../assets/i18n/withdrawal-info/ru.json';
import withdrawals from '../../../assets/i18n/withdrawals/ru.json';

/**
 * @deprecated
 */
export function getTranslocoModule(config: Partial<TranslocoConfig> = {}) {
    return TranslocoTestingModule.withLangs(
        {
            ru,
            actionbar,
            'api-key': apiKey,
            'api-model-details': apiModelDetails,
            'api-model-types': apiModelTypes,
            claim,
            'claim-modification-containers': claimModificationContainers,
            claims,
            'create-invoice': createInvoice,
            'create-invoice-template': createInvoiceTemplate,
            'create-payment-link': createPaymentLink,
            'create-shop': createShop,
            'currency-filter': currencyFilter,
            dadata,
            daterange,
            'daterange-filter': daterangeFilter,
            'deposit-info': depositInfo,
            deposits,
            'file-uploader': fileUploader,
            'filter-shops': filterShops,
            invoice,
            'invoice-details': invoiceDetails,
            invoices,
            'invoices-filter': invoicesFilter,
            main,
            onboarding,
            operations,
            organizations,
            'payment-details': paymentDetails,
            'payment-info': paymentInfo,
            'payment-link': paymentLink,
            'payment-section': paymentSection,
            payouts,
            'range-datepicker': rangeDatepicker,
            'refund-details': refundDetails,
            'refund-status-filter': refundStatusFilter,
            reports,
            shops,
            'shop-selector': shopSelector,
            'test-env-banner': testEnvBanner,
            toolbar,
            'wallet-details': walletDetails,
            wallets,
            'wallet-section': walletSection,
            'wallet-webhooks': walletWebhooks,
            webhook,
            'withdrawal-info': withdrawalInfo,
            withdrawals,
        },
        {
            availableLangs: ['ru'],
            defaultLang: 'ru',
            ...config,
        }
    );
}
