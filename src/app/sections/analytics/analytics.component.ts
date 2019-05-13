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

    addPeriodData() {
        this.periodData = [
            ...this.periodData,
            {
                time: `${this.getRandomYear()}-01-03T00:00:00Z`,
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
                        name: 'wow',
                        value: this.getRandom()
                    }
                ]
            }
        ];
    }

    removePeriodData() {
        this.periodData = this.periodData.slice(0, this.periodData.length - 1);
    }

    getRandom = () => Math.ceil(Math.random() * 100000000);
    getRandomYear = () => Math.ceil(Math.random() * 1000 + 1100);

    addSegmentData() {
        this.segmentData = [
            ...this.segmentData,
            {
                name: `kek${this.getRandom()}`,
                value: this.getRandom()
            }
        ];
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
            data.forEach((d) => {
                v.values.push({time: new Date(d.time), value: d.values[i].value})
            });
        });
        return preparedData;
    }
}
