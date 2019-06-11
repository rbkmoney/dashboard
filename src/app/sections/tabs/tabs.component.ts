import { Component, OnInit } from '@angular/core';
import {
    BarChartConfig,
    DonutChartConfig,
    LegendItem,
    LinearChartConfig,
    LinearPeriodData,
    PeriodData,
    SegmentData
} from '../../charts/models/chart-data-models';
import { ChartsService } from '../../charts/charts.service';
import { getLinearLegendData, getPeriodLegendData, getSegmentLegendData, periodToLinearData } from '../../charts/chart-utils';

@Component({
    selector: 'dsh-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
    periodData: PeriodData[];
    preparedPeriodData: LinearPeriodData[];
    segmentData: SegmentData[];

    periodLegendData: LegendItem[];
    linearLegendData: LegendItem[];
    segmentLegendData: LegendItem[];

    barChartConfig: BarChartConfig;
    donutChartConfig: DonutChartConfig;
    linearChartConfig: LinearChartConfig;


    constructor(private chartsService: ChartsService) {}

    ngOnInit() {
        this.refreshValue();
        this.barChartConfig = new BarChartConfig(1000, 400);
        this.donutChartConfig = new DonutChartConfig(200);
        this.linearChartConfig = new LinearChartConfig(1000, 400);
    }

    refreshValue() {
        this.periodData = this.chartsService.getPeriodData(20, 3);
        this.preparedPeriodData = periodToLinearData(this.chartsService.getPeriodData(20, 2));
        this.segmentData = this.chartsService.getSegmentData(5);
        this.periodLegendData = getPeriodLegendData(this.periodData);
        this.linearLegendData = getLinearLegendData(this.preparedPeriodData);
        this.segmentLegendData = getSegmentLegendData(this.segmentData);
    }

}
