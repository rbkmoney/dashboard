import { ApexOptions } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_LEGEND } from '../default-legend';
import { DEFAULT_STATES } from '../default-states';

export const DEFAULT_CONFIG: ApexOptions = {
    chart: {
        type: 'donut',
        width: '100%',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        ...DEFAULT_LEGEND,
        horizontalAlign: 'center',
        itemMargin: {
            vertical: 4
        },
        formatter: (seriesName, opts) => {
            return `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}%`;
        }
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '92',
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
