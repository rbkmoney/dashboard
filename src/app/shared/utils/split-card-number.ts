const DEFAULT_CARD_NUMBER_SPLIT_LENGTH = 4;

export function splitCardNumber(
    cardNumber: string,
    splitLength: number = DEFAULT_CARD_NUMBER_SPLIT_LENGTH,
    splitStr = ' '
): string {
    return cardNumber.replace(new RegExp(`.{${splitLength}}`, 'g'), '$&' + splitStr);
}
