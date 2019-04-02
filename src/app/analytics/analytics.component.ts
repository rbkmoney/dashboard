import { Component, OnInit } from '@angular/core';
import { PeriodData, SegmentData } from '../charts/models/chart-data-models';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    periodData: PeriodData[];
    segmentData: SegmentData[];

    constructor() {}

    ngOnInit() {
        this.periodData = this.getPeriodData();
        this.segmentData = this.getSegmentData();
    }

    refreshValue() {
        this.periodData = this.getPeriodData();
        this.segmentData = this.getSegmentData();
    }

    getRandom = () => Math.ceil(Math.random() * 1000);

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
                },
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
                },
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
                },
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
        },
    ]
}
