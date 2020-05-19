import { ApexLegend } from 'ng-apexcharts';

const LEGEND_ROUND_SIZE = 15;
const VERTICAL_MARGIN = 4;
const HORIZONTAL_MARGIN = 5;

export const DEFAULT_LEGEND: ApexLegend = {
    position: 'bottom',
    horizontalAlign: 'center',
    markers: {
        width: LEGEND_ROUND_SIZE,
        height: LEGEND_ROUND_SIZE,
        radius: LEGEND_ROUND_SIZE,
    },
    itemMargin: {
        vertical: VERTICAL_MARGIN,
        horizontal: HORIZONTAL_MARGIN,
    },
    onItemHover: {
        highlightDataSeries: false,
    },
};
