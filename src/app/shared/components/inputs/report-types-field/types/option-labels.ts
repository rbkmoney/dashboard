import { Report } from '@dsh/api-codegen/anapi';

export const OPTION_LABELS: { [N in Report.ReportTypeEnum]: string } = {
    provisionOfService: 'provisionOfService',
    paymentRegistry: 'paymentRegistry',
    paymentRegistryByPayout: 'paymentRegistryByPayout',
};
