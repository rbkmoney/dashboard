import { ApexOptions } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_ANIMATION } from '@dsh/components/charts/default-animation';

import { DEFAULT_LEGEND } from '../default-legend';
import { DEFAULT_STATES } from '../default-states';

const INNER_DONUT_RADIUS = '92';

export const DEFAULT_CONFIG: ApexOptions = {
    chart: {
        type: 'donut',
        width: '100%',
        toolbar: {
            show: false
        },
        animations: DEFAULT_ANIMATION
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        ...DEFAULT_LEGEND,
        formatter: (seriesName, opts) => {
            return `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}%`;
        }
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: INNER_DONUT_RADIUS,
                labels: {
                    show: false
                }
            }
        }
    },
    tooltip: {
        enabled: false
    },
    states: DEFAULT_STATES
};
