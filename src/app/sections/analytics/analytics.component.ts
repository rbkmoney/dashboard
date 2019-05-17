import { Component, OnInit } from '@angular/core';
import { LegendItem, PeriodData, PreparedPeriodData, SegmentData } from '../../charts/models/chart-data-models';
import { ChartsService } from '../../charts/charts.service';
import { chartColors } from '../../charts/color-constants';

@Component({
    selector: 'dsh-app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    periodData: PeriodData[];
    preparedPeriodData: PreparedPeriodData[];
    segmentData: SegmentData[];

    private periodLegendData: LegendItem[];
    private linearLegendData: LegendItem[];
    private segmentLegendData: LegendItem[];

    constructor(private chartsService: ChartsService) {}

    ngOnInit() {
        this.refreshValue();
    }

    refreshValue() {
        this.periodData = this.chartsService.getPeriodData(7, 2);
        this.preparedPeriodData = this.preparePeriodData(this.chartsService.getPeriodData(5, 3));
        this.segmentData = this.chartsService.getSegmentData(5);
        this.periodLegendData = this.getPeriodLegendData(this.periodData);
        this.linearLegendData = this.getLinearLegendData(this.preparedPeriodData);
        this.segmentLegendData = this.getSegmentLegendData(this.segmentData);
    }

    private preparePeriodData(data: PeriodData[]): PreparedPeriodData[] {
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

    private getPeriodLegendData(data: PeriodData[]): LegendItem[] {
        const items: LegendItem[] = [];
        data[0].values.forEach((item, i) => {
            items.push({
                name: item.name,
                color: chartColors[i]
            });
        });
        return items;
    }

    private getLinearLegendData(data: PreparedPeriodData[]): LegendItem[] {
        const items: LegendItem[] = [];
        data.forEach((item, i) => {
            items.push({
                name: item.name,
                color: chartColors[i]
            });
        });
        return items;
    }

    private getSegmentLegendData(data: SegmentData[]): LegendItem[] {
        const items: LegendItem[] = [];
        data.forEach((item, i) => {
            items.push({
                name: item.name,
                color: chartColors[i],
                value: item.value
            });
        });
        return items;
    }
}
