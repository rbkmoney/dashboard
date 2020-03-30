import { CountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { StatData } from './stat-data';

export function countResultToStatData([current, previous]: CountResult[][]): StatData[] {
    const statData: StatData[] = [];
    if (current.length === previous.length) {
        for (let i = 0; i < current.length; i++) {
            statData.push({
                current: current[i].count,
                previous: previous[i].count,
                currency: current[i].currency
            });
        }
    } else if (current.length > previous.length) {
        let missingCurrenciesCount = 0;
        for (let i = 0; i < current.length; i++) {
            const previousCurrentId = i - missingCurrenciesCount;
            const isCurrencyMatched = current[i].currency === previous[previousCurrentId].currency;
            if (!isCurrencyMatched) {
                missingCurrenciesCount++;
            }
            statData.push({
                current: current[i].count,
                previous: isCurrencyMatched ? previous[previousCurrentId].count : undefined,
                currency: current[i].currency
            });
        }
    } else {
        let missingCurrenciesCount = 0;
        for (let i = 0; i < previous.length; i++) {
            const currentCurrentId = i - missingCurrenciesCount;
            const isCurrencyMatched = previous[i].currency === current[currentCurrentId].currency;
            if (!isCurrencyMatched) {
                missingCurrenciesCount++;
            }
            statData.push({
                current: isCurrencyMatched ? current[currentCurrentId].count : undefined,
                previous: previous[i].count,
                currency: current[i].currency
            });
        }
    }
    return statData;
}
