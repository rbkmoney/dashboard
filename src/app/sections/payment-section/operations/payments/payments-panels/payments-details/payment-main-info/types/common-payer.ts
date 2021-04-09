import { CustomerPayer, PaymentResourcePayer, RecurrentPayer } from '@dsh/api-codegen/anapi';

export type CommonPayer = PaymentResourcePayer | CustomerPayer | RecurrentPayer;
