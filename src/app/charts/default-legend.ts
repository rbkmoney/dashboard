import { ApexLegend } from 'ng-apexcharts';

const LEGEND_ROUND_SIZE = 15;

export const DEFAULT_LEGEND: ApexLegend = {
    position: 'bottom',
    markers: {
        width: LEGEND_ROUND_SIZE,
        height: LEGEND_ROUND_SIZE,
        radius: LEGEND_ROUND_SIZE
    },
    onItemHover: {
        highlightDataSeries: false
    }
};
