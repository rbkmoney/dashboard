import { formatNumber } from '@angular/common';
import { locale } from 'moment';

const getGetTooltipTitle = (x: string | null): string =>
    x.includes('hide') || x.includes('show') ? x.split('#')[0] : x;

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
    const x = getValueX(w.config.series, dataPointIndex);
    const tooltipTitle = getGetTooltipTitle(x);
    return `
        <div class="dsh-bar-chart-tooltip-title mat-caption">${tooltipTitle}</div>
        ${values}
    `;
};

const getValueX = (series: any[], index: number): string =>
    series.reduce((acc, curr) => (acc ? acc : curr.data.length ? curr.data[index].x : acc), null);
