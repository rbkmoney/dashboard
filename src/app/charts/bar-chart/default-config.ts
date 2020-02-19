import { ApexOptions } from 'ng-apexcharts/lib/model/apex-types';
import { formatDate } from '@angular/common';
import moment from 'moment';

import { customTooltip } from './custom-tooltip';

const legendRoundSize = 12;
const columnWidth = '30%';

export const defaultConfig: ApexOptions = {
    chart: {
        type: 'bar',
        stacked: true,
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
            width: legendRoundSize,
            height: legendRoundSize,
            radius: legendRoundSize
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
            columnWidth
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
