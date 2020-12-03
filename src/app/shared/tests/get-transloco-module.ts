import { TranslocoConfig, TranslocoTestingModule } from '@ngneat/transloco';

import ru from '../../../assets/i18n/ru.json';

export function getTranslocoModule(config: Partial<TranslocoConfig> = {}) {
    return TranslocoTestingModule.withLangs(
        {
            ru,
            // actionbar                      create-shop       invoice-details  payment-section       toolbar
            // api-key                        currency-filter   invoices         payouts               wallet-details
            // api-model-details              dadata            invoices-filter  range-datepicker      wallets
            // api-model-types                daterange         main             refund-details        wallet-section
            // claim                          daterange-filter  onboarding       refund-status-filter  wallet-webhooks
            // claim-modification-containers  deposit-info      operations       reports               webhook
            // claims                         deposits          organizations    ru.json               withdrawal-info
            // create-invoice                 file-uploader     payment-details  shops                 withdrawals
            // create-invoice-template        filter-shops      payment-info     shop-selector
            // create-payment-link            invoice           payment-link     test-env-banner
        },
        {
            availableLangs: ['ru'],
            defaultLang: 'ru',
            ...config,
        }
    );
}
