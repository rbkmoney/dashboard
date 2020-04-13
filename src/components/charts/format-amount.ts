export const formatAmount = (num: number): string => {
    switch (true) {
        case num < 1000:
            return num.toString();
        case num < 1000000:
            return num.toString() + 'K';
        case num < 1000000000:
            return num.toString() + 'M';
        case num < 1000000000000:
            return num.toString() + 'B';
        default:
            return num.toString();
    }
};
