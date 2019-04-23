import { Injectable } from '@angular/core';
import { PeriodData } from './models/chart-data-models';

@Injectable()
export class ChartsService {
    getRandom = () => Math.ceil(Math.random() * 100000000);

    getPeriodData = (timesCount: number, valuesCount: number): PeriodData[] => {
        const periodData = [];
        for (let i = 1; i <= timesCount; i++) {
            const values = [];
            for (let j = 0; j < valuesCount; j++) {
                values.push({
                    name: `kek ${j}`,
                    value: this.getRandom()
                })
            }
            periodData.push({
                time: `2017-01-${i > 9 ? i : `0${i}`}T00:00:00Z`,
                values
            });
        }
        return periodData;
    };

    getSegmentData = () => [
        {
            name: 'kek',
            value: this.getRandom()
        },
        {
            name: 'lol',
            value: this.getRandom()
        },
        {
            name: 'kappa',
            value: this.getRandom()
        },
        {
            name: '4head',
            value: this.getRandom()
        },
        {
            name: 'omegalul',
            value: this.getRandom()
        }
    ];
}
