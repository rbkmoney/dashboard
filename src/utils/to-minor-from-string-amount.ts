const getMinorAmount = (amount: number): number => Math.round(amount * 100);

const amountToNumber = (amount: string): number => Number(amount.replace(',', '.'));

export const toMinorAmountFromString = (amount: string): number => {
    const numericalAmount = amountToNumber(amount);
    return numericalAmount > 0 ? getMinorAmount(numericalAmount) : undefined;
};
