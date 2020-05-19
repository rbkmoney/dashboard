import { formatNumber } from '@angular/common';
import { locale } from 'moment';

export const formatAmount = (num: number): string => {
    for (const amountUnit of amountUnits) {
        if (num >= amountUnit.amount) {
            return formatNumber(num / amountUnit.amount, locale(), '1.0-2') + amountUnit.unit;
        }
    }
    return formatNumber(num, locale(), '1.0-2');
};

interface AmountUnit {
    amount: number;
    unit: '' | 'K' | 'M' | 'B';
}

const amountUnits: AmountUnit[] = [
    { amount: 1000000000, unit: 'B' },
    { amount: 1000000, unit: 'M' },
    { amount: 1000, unit: 'K' },
];
