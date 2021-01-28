const DEFAULT_CARD_NUMBER_LENGTH = 16;

export function makeMaskedCardStart(cardNumber: string, length: number = DEFAULT_CARD_NUMBER_LENGTH): string {
    return cardNumber.padEnd(length, '*');
}

export function makeMaskedCardEnd(cardNumber: string, length: number = DEFAULT_CARD_NUMBER_LENGTH): string {
    return cardNumber.padStart(length, '*');
}
