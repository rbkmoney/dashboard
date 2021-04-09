import { PaymentFlow, PaymentFlowHold } from '@dsh/api-codegen/anapi';

export function isPaymentFlowHold(flow: PaymentFlow): flow is PaymentFlowHold {
    return flow.type === 'PaymentFlowHold';
}
