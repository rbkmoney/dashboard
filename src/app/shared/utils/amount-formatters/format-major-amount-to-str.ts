import { isNil } from '@dsh/utils';

import { formatVisualDot } from './format-visual-dot';

export function formatMajorAmountToStr(amount: number | null): string {
    if (isNil(amount) || isNaN(amount)) {
        return '';
    }

    return formatVisualDot(String(amount));
}
