import { Injectable } from '@angular/core';
import { PeriodData, SegmentData } from './models/chart-data-models';

@Injectable()
export class ChartsService {
    private loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
        ' '
    );
    getRandom = (n = 1000000) => Math.ceil(Math.random() * n);

    getPeriodData = (timesCount: number, valuesCount: number): PeriodData[] => {
        const periodData = [];
        const additionalIndex = this.getRandom(20);
        for (let i = 1; i <= timesCount; i++) {
            const values = [];
            for (let j = 0; j < valuesCount; j++) {
                values.push({
                    name: this.loremIpsum[j + additionalIndex],
                    value: this.getRandom()
                });
            }
            periodData.push({
                time: `2017-01-${i > 9 ? i : `0${i}`}T00:00:00Z`,
                values
            });
        }
        return periodData;
    };

    getSegmentData = (n): SegmentData[] => {
        const data: SegmentData[] = [];
        for (let i = 0; i < n; i++) {
            data.push({
                name: this.loremIpsum[this.getRandom(this.loremIpsum.length - 1)],
                value: this.getRandom()
            });
        }
        return data;
    };
}
