import { Component, OnInit } from '@angular/core';
import { PeriodData, PreparedPeriodData, SegmentData } from '../../charts/models/chart-data-models';
import { ChartsService } from '../../charts/charts.service';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    periodData: PeriodData[];
    preparedPeriodData: PreparedPeriodData[];
    segmentData: SegmentData[];

    constructor(private chartsService: ChartsService) {}

    ngOnInit() {
        this.refreshValue();
    }

    refreshValue() {
        this.periodData = this.chartsService.getPeriodData(7, 2);
        this.preparedPeriodData = this.preparePeriodData(this.chartsService.getPeriodData(5, 3));
        this.segmentData = this.chartsService.getSegmentData();
    }

    preparePeriodData(data: PeriodData[]): PreparedPeriodData[] {
        const preparedData: PreparedPeriodData[] = [];
        data[0].values.forEach((v, i) => {
            preparedData[i] = {
                name: v.name,
                values: []
            };
        });
        preparedData.forEach((v, i) => {
            data.forEach(d => {
                v.values.push({ time: new Date(d.time), value: d.values[i].value });
            });
        });
        return preparedData;
    }
}
