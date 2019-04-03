import { Component, OnInit } from '@angular/core';
import { PeriodData, SegmentData } from '../charts/models/chart-data-models';
import { AnalyticsService } from './analytics.service';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    periodData: PeriodData[];
    segmentData: SegmentData[];

    constructor(private analyticsService: AnalyticsService) {}

    ngOnInit() {
        this.periodData = this.analyticsService.getPeriodData();
        this.segmentData = this.analyticsService.getSegmentData();
    }

    refreshValue() {
        this.periodData = this.analyticsService.getPeriodData();
        this.segmentData = this.analyticsService.getSegmentData();
    }
}
