import { ApexOptions } from 'ng-apexcharts/lib/model/apex-types';
import { formatDate } from '@angular/common';
import moment from 'moment';

import { customTooltip } from './custom-tooltip';

const LEGEND_ROUND_SIZE = 12;
const COLUMN_WIDTH = '30%';

export const DEFAULT_CONFIG: ApexOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        height: 300,
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        position: 'bottom',
        markers: {
            width: LEGEND_ROUND_SIZE,
            height: LEGEND_ROUND_SIZE,
            radius: LEGEND_ROUND_SIZE
        },
        onItemHover: {
            highlightDataSeries: false
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        custom: customTooltip
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: COLUMN_WIDTH
        }
    },
    xaxis: {
        type: 'category',
        labels: {
            formatter(value: string): string {
                return formatDate(value, 'dd.MM', moment.locale());
            },
            offsetY: -5
        },
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        },
        crosshairs: {
            show: false
        }
    },
    yaxis: {
        forceNiceScale: true
    },
    states: {
        hover: {
            filter: {
                type: 'none'
            }
        },
        active: {
            filter: {
                type: 'none'
            }
        }
    }
};
