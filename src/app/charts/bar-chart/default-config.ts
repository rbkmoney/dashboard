import { ApexOptions } from 'ng-apexcharts/lib/model/apex-types';
import { formatDate } from '@angular/common';
import moment from 'moment';

import { customTooltip } from './custom-tooltip';
import { DEFAULT_LEGEND } from '../default-legend';
import { DEFAULT_STATES } from '../default-states';


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
    legend: DEFAULT_LEGEND,
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
            formatter: (v: string): string => formatDate(v, 'dd.MM', moment.locale()),
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
    states: DEFAULT_STATES
};
