import { CreateRefundDialogResponseStatus } from './create-refund-dialog-response-status';

export interface CreateRefundDialogResponse {
    status: CreateRefundDialogResponseStatus;
    availableAmount?: number;
}
