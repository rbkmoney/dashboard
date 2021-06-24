import { RefundStatus } from '@dsh/api-codegen/dark-api';

export const OPTION_LABELS: { [N in RefundStatus.StatusEnum]: string } = {
    succeeded: 'succeeded',
    failed: 'failed',
    pending: 'pending',
};
