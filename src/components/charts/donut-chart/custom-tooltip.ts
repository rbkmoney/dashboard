import { formatDate } from '@angular/common';
import moment from 'moment';

export const customTooltip = ({ series, dataPointIndex, w }) => {
    let values = '';
    for (let i = 0; i < series.length; i++) {
        values += `
            <div class="dsh-bar-chart-tooltip-container">
                <div class="dsh-bar-chart-tooltip-round mat-caption" style="background-color: ${w.globals.colors[i]}"></div>
                ${w.globals.seriesNames[i]} - ${series[i][dataPointIndex]}
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
