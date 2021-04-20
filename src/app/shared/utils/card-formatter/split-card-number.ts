import isString from 'lodash-es/isString';

const DEFAULT_CARD_NUMBER_SPLIT_LENGTH = 4;

export function splitCardNumber(cardNumber: string, splitLength: number = DEFAULT_CARD_NUMBER_SPLIT_LENGTH): string {
    return cardNumber
        .split('')
        .reduce((splitDigits: string[], digit: string) => {
            const lastSplitRow = splitDigits[splitDigits.length - 1];
            if (isString(lastSplitRow) && lastSplitRow.length < splitLength) {
                splitDigits[splitDigits.length - 1] += digit;
            } else {
                splitDigits.push(digit);
            }

            return splitDigits;
        }, [])
        .join(' ');
}
