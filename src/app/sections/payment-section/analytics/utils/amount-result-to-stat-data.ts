import { AmountResult } from '../../../../api-codegen/anapi/swagger-codegen';
import { StatData } from './stat-data';

export function amountResultToStatData([current, previous]: AmountResult[][]): StatData[] {
    const statData: StatData[] = [];
    if (current.length === previous.length) {
        for (let i = 0; i < current.length; i++) {
            statData.push({
                current: current[i].amount,
                previous: previous[i].amount,
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
                current: current[i].amount,
                previous: isCurrencyMatched ? previous[previousCurrentId].amount : undefined,
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
                current: isCurrencyMatched ? current[currentCurrentId].amount : undefined,
                previous: previous[i].amount,
                currency: current[i].currency
            });
        }
    }
    return statData;
}
