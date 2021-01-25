import { CardBinPan } from '../card-bin-pan-filter';

export type PaymentBinPan = {
    // can be expanded in the future
    paymentMethod: 'bankCard';
} & Partial<CardBinPan>;
