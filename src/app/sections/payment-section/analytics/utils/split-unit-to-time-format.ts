import { SplitUnit } from '../../../../api-codegen/anapi/swagger-codegen';

export const splitUnitToTimeFormat = (unit: SplitUnit): string => {
    switch (unit) {
        case 'hour':
            return 'HH:mm';
        case 'day':
        case 'week':
            return 'DD.MM';
        case 'month':
            return 'MMMM';
        default:
            return 'DD.MM.YYYY, HH:mm';
    }
};
