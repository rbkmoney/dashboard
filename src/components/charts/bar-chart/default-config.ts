import { ApexOptions } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_ANIMATION } from '@dsh/components/charts/default-animation';
import { formatAmount } from '@dsh/components/charts/format-amount';

import { DEFAULT_LEGEND } from '../default-legend';
import { DEFAULT_STATES } from '../default-states';
import { customTooltip } from './custom-tooltip';

const COLUMN_WIDTH = '30%';

export const DEFAULT_CONFIG: ApexOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        height: 300,
        toolbar: {
            show: false
        },
        animations: DEFAULT_ANIMATION
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
            offsetY: -5,
            hideOverlappingLabels: true
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
        forceNiceScale: true,
        labels: {
            formatter: formatAmount
        }
    },
    states: DEFAULT_STATES
};
