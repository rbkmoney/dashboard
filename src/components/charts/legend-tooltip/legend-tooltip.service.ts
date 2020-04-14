import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { select } from 'd3-selection';
import { locale } from 'moment';

import { LegendTooltipData } from '../models/chart-data-models';

@Injectable()
export class LegendTooltipService {
    private tooltip;
    private tooltipMouseMargin = 15;

    private isInitialized = false;

    getLegendItem() {
        const item = this.tooltip.append('div').attr('class', 'legend-tooltip-item');
        item.append('svg').attr('class', 'legend-tooltip-item-color');
        item.append('text').attr('class', 'legend-tooltip-item-status');
        item.append('text').attr('class', 'legend-tooltip-item-value-before');
        item.append('text').attr('class', 'legend-tooltip-item-value');
        return item;
    }

    getLegendTooltip(data: LegendTooltipData) {
        if (data.date) {
            this.tooltip
                .append('div')
                .attr('class', 'legend-tooltip-date')
                .text(formatDate(data.date, 'dd.MM.yyyy, EEEEEE', locale()).toLocaleUpperCase());
        }

        data.values.forEach(v => {
            const item = this.getLegendItem();

            item.select('.legend-tooltip-item-color')
                .append('rect')
                .attr('class', 'legend-tooltip-item-rect')
                .attr('rx', 3)
                .attr('ry', 3)
                .attr('fill', v.color);

            item.select('.legend-tooltip-item-status').text(v.name);

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
            .style('top', `${(event as MouseEvent).clientY + this.tooltipMouseMargin}px`)
            .style('left', `${(event as MouseEvent).clientX + this.tooltipMouseMargin}px`)
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
