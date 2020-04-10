import { formatDate, formatNumber } from '@angular/common';
import moment, { locale } from 'moment';

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
    return `
        <div class="dsh-bar-chart-tooltip-title mat-caption">${formatDate(
            w.config.xaxis.categories[dataPointIndex],
            'dd.MM.yyyy, EEEEEE',
            moment.locale()
        ).toLocaleUpperCase()}
        </div>
        ${values}
    `;
};
