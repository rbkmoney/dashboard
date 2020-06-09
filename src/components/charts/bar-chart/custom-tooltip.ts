import { formatNumber } from '@angular/common';
import { locale } from 'moment';

const getGetTooltipTitle = (x: string): string => (x.includes('hide') || x.includes('show') ? x.split('#')[0] : x);

export const customTooltip = ({ series, dataPointIndex, w }) => {
    let values = '';
    for (let i = 0; i < series.length; i++) {
        const formattedAmount = formatNumber(series[i][dataPointIndex], locale());
        const tooltipValue = w.globals.initialSeries[i].name
            ? `${w.globals.seriesNames[i]} - ${formattedAmount}`
            : formattedAmount;
        values += `
            <div class="dsh-bar-chart-tooltip-container">
                <div class="dsh-bar-chart-tooltip-round mat-caption" style="background-color: ${w.globals.colors[i]}"></div>
                ${tooltipValue}
             </div>`;
    }
    const x = w.config.series[0].data[dataPointIndex].x;
    const tooltipTitle = getGetTooltipTitle(x);
    return `
        <div class="dsh-bar-chart-tooltip-title mat-caption">${tooltipTitle}</div>
        ${values}
    `;
};
