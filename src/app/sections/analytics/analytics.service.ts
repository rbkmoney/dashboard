import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsService {
    getRandom = () => Math.ceil(Math.random() * 100000000);

    getPeriodData = () => [
        {
            time: '2017-01-01T00:00:00Z',
            values: [
                {
                    name: 'kek',
                    value: this.getRandom()
                },
                {
                    name: 'lol',
                    value: this.getRandom()
                }
            ]
        },
        {
            time: '2017-01-02T00:00:00Z',
            values: [
                {
                    name: 'kek',
                    value: this.getRandom()
                },
                {
                    name: 'lol',
                    value: this.getRandom()
                }
            ]
        },
        {
            time: '2017-01-03T00:00:00Z',
            values: [
                {
                    name: 'kek',
                    value: this.getRandom()
                },
                {
                    name: 'lol',
                    value: this.getRandom()
                }
            ]
        }
    ];

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
