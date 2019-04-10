import { Component, OnInit } from '@angular/core';
import { PeriodData, SegmentData } from '../charts/models/chart-data-models';
import { ChartsService } from '../charts/charts.service';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    periodData: PeriodData[];
    segmentData: SegmentData[];

    constructor(private chartsService: ChartsService) {}

    ngOnInit() {
        this.periodData = this.chartsService.getPeriodData();
        this.segmentData = this.chartsService.getSegmentData();
    }

    refreshValue() {
        this.periodData = this.chartsService.getPeriodData();
        this.segmentData = this.chartsService.getSegmentData();
    }

    addPeriodData() {
        this.periodData = [
            ...this.periodData,
            {
                time: `${this.getRandom()}-01-03T00:00:00Z`,
                values: [
                    {
                        name: 'kek',
                        value: this.getRandom()
                    },
                    {
                        name: 'lol',
                        value: this.getRandom()
                    },
                    {
                        name: 'kek',
                        value: this.getRandom()
                    }
                ]
            }
        ]
    }

    removePeriodData() {
        this.periodData = this.periodData.slice(0, this.periodData.length - 1);
    }

    getRandom = () => Math.ceil(Math.random() * 1000);

    addSegmentData() {
        this.segmentData = [
            ...this.segmentData,
            {
                name: `kek${this.getRandom()}`,
                value: this.getRandom()
            }
        ]
    }
}
