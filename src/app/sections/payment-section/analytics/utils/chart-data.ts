import { ApexAxisChartSeries } from 'ng-apexcharts';

export interface ChartData {
    currency: string;
    series: ApexAxisChartSeries;
    times: string[];
}
