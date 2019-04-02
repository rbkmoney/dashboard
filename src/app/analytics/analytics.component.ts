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
}
