import { Component, OnInit } from '@angular/core';

import { LegendItem, PeriodData, LinearPeriodData, SegmentData } from '../../charts/models/chart-data-models';
import { ChartsService } from '../../charts/charts.service';
import {
    getLinearLegendData,
    getPeriodLegendData,
    getSegmentLegendData,
    periodToLinearData
} from '../../charts/chart-utils';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    periodData: PeriodData[];
    preparedPeriodData: LinearPeriodData[];
    segmentData: SegmentData[];

    periodLegendData: LegendItem[];
    linearLegendData: LegendItem[];
    segmentLegendData: LegendItem[];

    constructor(private chartsService: ChartsService) {}

    ngOnInit() {
        this.refreshValue();
    }

    refreshValue() {
        this.periodData = this.chartsService.getPeriodData(7, 2);
        this.preparedPeriodData = periodToLinearData(this.chartsService.getPeriodData(10, 2));
        this.segmentData = this.chartsService.getSegmentData(5);
        this.periodLegendData = getPeriodLegendData(this.periodData);
        this.linearLegendData = getLinearLegendData(this.preparedPeriodData);
        this.segmentLegendData = getSegmentLegendData(this.segmentData);
    }
}
