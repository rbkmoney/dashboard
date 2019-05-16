import { Injectable } from '@angular/core';
import { select } from 'd3-selection';
import { LegendTooltipData } from '../models/chart-data-models';
import { formatDate } from '@angular/common';
import { locale } from 'moment';
import { bisectLeft } from 'd3-array';


@Injectable()
export class LegendTooltipService {

    tooltip;

    private isInitialized = false;

    getLegendItem() {
        const item = this.tooltip.append('div').attr('class', 'legend-tooltip-item');
        item.append('svg').attr('class', 'legend-tooltip-item-color');
        item.append('text').attr('class', 'legend-tooltip-item-text');
        item.append('text').attr('class', 'legend-tooltip-item-value-before');
        item.append('text').attr('class', 'legend-tooltip-item-value');
        return item;
    }

    getLegendTooltip(data: LegendTooltipData) {
        if (data.date) {
            this.tooltip.append('div').attr('class', 'legend-date').text(formatDate(data.date, 'dd.MM.yyyy, EEEEEE', locale()).toLocaleUpperCase());
        }

        data.values.forEach((v) => {
            const item = this.getLegendItem();

            item.select('.legend-tooltip-item-color')
                .append('rect')
                .attr('class', 'legend-tooltip-item-rect')
                .attr('rx', 3)
                .attr('ry', 3)
                .attr('fill', v.color);

            item.select('.legend-tooltip-item-text').text(v.name);

            if (v.value) {
                item.select('.legend-tooltip-item-value-before').text('–');
                item.select('.legend-tooltip-item-value').text(v.value);
            } else {
                item.select('.legend-tooltip-item-value-before').text('');
            }
        });
    }

    showLegendTooltip(data: LegendTooltipData, element: HTMLElement) {
        if (!this.isInitialized) {
            this.tooltip = select(element)
                .append('div')
                .attr('class', 'legend-tooltip-container');
            this.isInitialized = true;
        }

        this.removeLegend(element);
        this.getLegendTooltip(data);

        select(element)
            .select('.legend-tooltip-container')
            .style('top', `${(event as MouseEvent).pageY + 5}px`)
            .style('left', `${(event as MouseEvent).pageX + 5}px`)
            .style('display', 'flex');
    }

    removeLegend(element: HTMLElement) {
        select(element)
            .select('.legend-tooltip-container')
            .style('display', 'none')
            .selectAll('*')
            .remove();
    }
}
