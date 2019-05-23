import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { select, Selection } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear, scaleTime } from 'd3-scale';
import { bisectLeft, extent, max, min } from 'd3-array';
import { easeExp } from 'd3-ease';
import { Axis, AxisDomain } from 'd3-axis';

import { chartColors } from '../color-constants';
import {
    ChartService,
    LinearChartConfig,
    LinearPeriodData,
    PreparedPeriodValue,
    SVGInitConfig
} from '../models/chart-data-models';
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';
import { ChartsService } from '../charts.service';
import { getLinearLegendTooltipData } from '../chart-utils';

export type LinearChartSvgType = Selection<SVGGElement, {}, null, LinearPeriodData>;

@Injectable()
export class LinearChartService implements ChartService<LinearPeriodData, LinearChartConfig> {
    private svg: LinearChartSvgType;
    private element: HTMLElement;
    private createLine: Line<PreparedPeriodValue>;
    private zeroLine: Line<PreparedPeriodValue>;
    private xScale: ScaleTime<number, number>;
    private yScale: ScaleLinear<number, number>;
    private xAxis: Axis<AxisDomain>;
    private yAxis: Axis<AxisDomain>;
    private config: LinearChartConfig;
    private tooltipLine: Selection<SVGLineElement, {}, null, LinearPeriodData>;

    private isInitialized = false;

    constructor(private chartsService: ChartsService, private legendTooltipService: LegendTooltipService) {}

    initChart(data: LinearPeriodData[], element, config?: LinearChartConfig) {
        this.config = config ? config : new LinearChartConfig(element.offsetWidth, element.offsetHeight);
        this.element = element;

        const svgConfig = new SVGInitConfig(element, this.config.width, this.config.height + this.config.commonMargin);

        this.svg = this.chartsService.getSVG(svgConfig) as LinearChartSvgType;

        this.svg.append('g').attr('class', 'lines');

        this.xScale = scaleTime().range([this.config.margin.firstBarMarginLeft, this.config.margin.lastBarMarginRight]);

        this.yScale = scaleLinear().range([this.config.height, 0]);

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.config.tickCount)[1]
        ]);

        this.createLine = line<PreparedPeriodValue>()
            .x(d => this.xScale(new Date(d.time)))
            .y(d => this.yScale(d.value));
        this.zeroLine = line<PreparedPeriodValue>()
            .x(d => this.xScale(new Date(d.time)))
            .y(this.config.height);

        this.xAxis = this.chartsService.getCustomAxisX(this.xScale);
        this.yAxis = this.chartsService.getCustomAxisY(this.yScale, this.config);

        this.chartsService.initAxis(this.svg, this.config);

        this.initTooltipLine();

        this.isInitialized = true;
        this.updateChart(data);
    }

    updateChart(data: LinearPeriodData[]) {
        if (this.isInitialized) {
            this.xScale.domain(extent(data[0].values, d => d.time));

            this.yScale.domain([
                0,
                max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.config.tickCount)[1]
            ]);

            this.chartsService.updateAxis(
                this.element,
                this.config.transitionDuration,
                extent(data[0].values, d => d.time),
                this.xAxis,
                this.yAxis
            );

            this.updateData(data);
        }
    }

    private updateData(data: LinearPeriodData[]) {
        this.svg
            .select('.lines')
            .selectAll('.line')
            .data(data)
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .attr('d', d => this.createLine(d.values));

        this.svg
            .on('mouseout', () => {
                this.removeTooltip();
            })
            .on('mouseover', () => {
                this.showTooltip();
            })
            .on('mousemove', () => {
                this.mousemove(data);
            });

        this.removeUnusedData(data);
        this.drawData(data);
    }

    private removeUnusedData(data: LinearPeriodData[]) {
        this.svg
            .selectAll('.time')
            .data(data)
            .exit()
            .remove();

        this.svg.selectAll('.circle').remove();
    }

    private drawData(data: LinearPeriodData[]) {
        const linesGroup = this.svg
            .select('.lines')
            .selectAll(`.line-group`)
            .data(data)
            .enter();

        const linesDescription = linesGroup
            .append('g')
            .attr('class', `line-group`)
            .append('path')
            .attr('class', `line`)
            .attr('d', d => this.zeroLine(d.values));

        const drawLine = linesDescription
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .attr('d', d => this.createLine(d.values))
            .style('stroke', (d, i) => chartColors[i]);

        const circleGroup = this.svg
            .selectAll('circle-group')
            .data(data)
            .enter();

        const circleDescription = circleGroup
            .append('g')
            .style('fill', (d, i) => chartColors[i])
            .selectAll('circle')
            .data(d => d.values)
            .enter();

        const initCircles = circleDescription
            .append('g')
            .attr('class', 'circle')
            .append('circle')
            .attr('cx', d => this.xScale(d.time))
            .attr('cy', this.config.height);

        const drawCircles = initCircles
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .attr('cx', d => this.xScale(d.time))
            .attr('cy', d => this.yScale(d.value))
            .attr('r', this.config.radius);
    }

    private initTooltipLine() {
        this.tooltipLine = this.svg
            .append('line')
            .attr('class', 'legend-tooltip-line')
            .attr('display', 'none')
            .attr('y1', this.config.commonMargin)
            .attr('y2', this.config.height);
    }

    private showTooltip() {
        this.tooltipLine.attr('display', 'block');
    }

    private removeTooltip() {
        this.tooltipLine.attr('display', 'none');
        this.legendTooltipService.removeLegend(this.element);
    }

    private mousemove(data: LinearPeriodData[]) {
        const dates = data[0].values.map(val => val.time);
        const x0 = this.xScale.invert((event as MouseEvent).layerX - this.config.width / (2 * dates.length));
        const i = min([bisectLeft(dates, x0), dates.length - 1]);
        const d = dates[i];

        this.legendTooltipService.showLegendTooltip(getLinearLegendTooltipData(data, i), this.element);
        this.tooltipLine.attr('x1', this.xScale(d)).attr('x2', this.xScale(d));
    }
}
