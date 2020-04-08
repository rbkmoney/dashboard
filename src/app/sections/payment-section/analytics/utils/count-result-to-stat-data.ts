import { CountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { StatData } from './stat-data';

export function countResultToStatData([current, previous]: CountResult[][]): StatData[] {
    if (current.length === previous.length) {
        return current.map(({ count, currency }, i) => ({
            current: count,
            currency,
            previous: previous[i].count
        }));
    } else if (current.length > previous.length) {
        let missingCurrenciesCount = 0;
        return current.map(({ count, currency }, i) => {
            const previousCurrentId = i - missingCurrenciesCount;
            const isCurrencyMatched = currency === previous[previousCurrentId].currency;
            if (!isCurrencyMatched) {
                missingCurrenciesCount++;
            }
            return {
                current: count,
                currency,
                previous: isCurrencyMatched ? previous[previousCurrentId].count : undefined
            };
        });
    } else {
        let missingCurrenciesCount = 0;
        return current.map(({ count, currency }, i) => {
            const currentCurrentId = i - missingCurrenciesCount;
            const isCurrencyMatched = currency === current[currentCurrentId].currency;
            if (!isCurrencyMatched) {
                missingCurrenciesCount++;
            }
            return {
                current: count,
                currency,
                previous: isCurrencyMatched ? previous[currentCurrentId].count : undefined
            };
        });
    }
}
