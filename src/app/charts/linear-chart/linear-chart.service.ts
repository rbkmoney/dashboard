import { Injectable } from '@angular/core';
import { select, Selection } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent, max } from 'd3-array';
import { easeExp } from 'd3-ease';
import { axisBottom, axisLeft } from 'd3-axis';
import { formatDate } from '@angular/common';
import { locale } from 'moment';

import { chartColors } from '../color-constants';
import { ChartService, LinearChartConfig, PreparedPeriodData, PreparedPeriodValue } from '../models/chart-data-models';

type LinearChartSvgType = Selection<SVGGElement, {}, null, PreparedPeriodData>;

@Injectable()
export class LinearChartService implements ChartService<PreparedPeriodData, LinearChartConfig> {
    private svg: LinearChartSvgType;
    private element: HTMLElement;
    private createLine;
    private zeroLine;
    private xScale;
    private yScale;
    private xAxis;
    private yAxis;
    private config: LinearChartConfig;

    private isInitialized = false;

    initChart(data: PreparedPeriodData[], element, config?: LinearChartConfig) {
        this.config = config ? config : new LinearChartConfig(element.offsetWidth, element.offsetHeight);
        this.element = element;

        this.svg = select(element)
            .select('svg')
            .attr('width', this.config.width)
            .attr('height', this.config.height + this.config.commonMargin)
            .attr('transform', `translate(0, 0)`) as Selection<SVGGElement, {}, null, PreparedPeriodData>;

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

        this.xAxis = this.getCustomAxisX();
        this.yAxis = this.getCustomAxisY();

        this.initAxis();
        this.isInitialized = true;
        this.updateChart(data);
    }

    updateChart(data: PreparedPeriodData[]) {
        if (this.isInitialized) {
            this.xScale.domain(extent(data[0].values, d => d.time));

            this.yScale.domain([
                0,
                max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.config.tickCount)[1]
            ]);

            this.updateAxis(data);
            this.updateData(data);
        }
    }

    private initAxis() {
        this.svg
            .append('g')
            .attr('class', 'x axis')
            .attr(
                'transform',
                `translate(${this.config.margin.xAxisHorizontalMargin}, ${this.config.margin.xAxisVerticalMargin})`
            );
        this.svg
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.config.margin.yAxisHorizontalMargin}, 0)`);
    }

    private updateAxis(data: PreparedPeriodData[]) {
        select(this.element)
            .select('.x.axis')
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .call(this.xAxis.tickValues(extent(data[0].values, d => d.time)));

        select(this.element)
            .select('.y.axis')
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .call(this.yAxis as any);
    }

    private updateData(data: PreparedPeriodData[]) {
        this.svg
            .select('.lines')
            .selectAll('.line')
            .data(data)
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .attr('d', d => this.createLine(d.values));

        this.removeUnusedData(data);
        this.drawData(data);
    }

    private removeUnusedData(data: PreparedPeriodData[]) {
        this.svg
            .selectAll('.time')
            .data(data)
            .exit()
            .remove();

        this.svg.selectAll('.circle').remove();
    }

    private drawData(data: PreparedPeriodData[]) {
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

    private getCustomAxisX() {
        return axisBottom(this.xScale)
            .tickSize(0)
            .tickFormat(d => formatDate(d as string, 'dd.MM.yyyy', locale()));
    }

    private getCustomAxisY() {
        return axisLeft(this.yScale)
            .ticks(this.config.tickCount)
            .tickSize(-this.config.width)
            .tickFormat(d => `${d}`);
    }
}
