export const formatAmount = (amount: number): string => {
    let res = amount;
    const rounder = Math.pow(10, 1);
    let key = '';

    const powers = [
        { key: 'T', value: Math.pow(10, 12) },
        { key: 'B', value: Math.pow(10, 9) },
        { key: 'M', value: Math.pow(10, 6) },
        { key: 'K', value: 1000 }
    ];

    for (const p of powers) {
        let reduced = res / p.value;
        reduced = Math.round(reduced * rounder) / rounder;
        if (reduced >= 1) {
            res = reduced;
            key = p.key;
            break;
        }
    }
    return res + key;
};
