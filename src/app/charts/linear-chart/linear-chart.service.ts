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
import { PreparedPeriodData, PreparedPeriodValue } from '../models/chart-data-models';

@Injectable()
export class LinearChartService {

    private createLine;
    private zeroLine;
    private xScale;
    private yScale;
    private xAxis;
    private yAxis;
    private height: number;
    private width: number;
    private transitionDuration = 1000;
    private tickCount = 5;
    private commonMargin = 20;

    private margin;

    initChart(svg: Selection<SVGGElement, {}, null, PreparedPeriodData>, data: PreparedPeriodData[], element) {
        this.width = element.offsetWidth;
        this.height = element.offsetHeight - this.commonMargin;
        this.margin = this.initMargins(this.width, this.height);

        svg = select(element)
            .select('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .attr('transform', `translate(0, 0)`) as Selection<SVGGElement, {}, null, PreparedPeriodData>;

        svg.append('g').attr('class', 'lines');

        this.xScale = scaleTime().range([this.margin.firstBarMarginLeft, this.margin.lastBarMarginRight]);

        this.yScale = scaleLinear().range([this.height, 0]);

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.tickCount)[1]
        ]);

        this.createLine = line<PreparedPeriodValue>().x(d => this.xScale(new Date(d.time))).y(d => this.yScale(d.value));
        this.zeroLine = line<PreparedPeriodValue>().x(d => this.xScale(new Date(d.time))).y(this.height);


        this.xAxis = this.getCustomAxisX();
        this.yAxis = this.getCustomAxisY();

        this.initAxis(svg);

        return this.updateChart(svg, data, element);
    }

    updateChart(svg: Selection<SVGGElement, {}, null, PreparedPeriodData>, data: PreparedPeriodData[], element) {

        this.xScale.domain(extent(data[0].values, d => d.time));

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.tickCount)[1]
        ]);

        this.updateAxis(data, element);
        this.updateData(svg, data);

        return svg;
    }

    private initAxis(svg: Selection<SVGGElement, {}, null, PreparedPeriodData>) {
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${this.margin.xAxisHorizontalMargin}, ${this.margin.xAxisVerticalMargin})`);
        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.margin.yAxisHorizontalMargin}, 0)`);
    }

    private updateAxis(data: PreparedPeriodData[], element) {
        select(element)
            .select('.x.axis')
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .call(this.xAxis.tickValues(extent(data[0].values, d => d.time)));
        select(element)
            .select('.y.axis')
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .call(this.yAxis as any);
    }

    private updateData(svg: Selection<SVGGElement, {}, null, PreparedPeriodData>, data: PreparedPeriodData[]) {
        svg.select('.lines')
            .selectAll('.line')
            .data(data)
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .attr('d', (d) => this.createLine(d.values));

        this.removeUnusedData(svg, data);
        this.drawData(svg, data);
    }

    private removeUnusedData(svg: Selection<SVGGElement, {}, null, PreparedPeriodData>, data: PreparedPeriodData[]) {
        svg.selectAll('.time')
            .data(data)
            .exit()
            .remove();
    }

    private drawData(svg: Selection<SVGGElement, {}, null, PreparedPeriodData>, data: PreparedPeriodData[]) {
        svg
            .select('.lines')
            .selectAll(`.line-group`)
            .data(data)
            .enter()
            .append('g')
            .attr('class', `line-group`)
            .append('path')
            .attr('class', `line`)
            .attr('d', (d) => this.zeroLine(d.values))
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .attr('d', (d) => this.createLine(d.values))
            .style('stroke', (d, i) => chartColors[i]);
    }

    private getCustomAxisX() {
        return axisBottom(this.xScale)
            .tickSize(0)
            .tickFormat(d => formatDate(d as string, 'dd.MM.yyyy', locale()));
    }

    private getCustomAxisY() {
        return axisLeft(this.yScale)
            .ticks(this.tickCount)
            .tickSize(-this.width)
            .tickFormat(d => `${d}`);
    }

    private initMargins(width: number, height: number) {
        return {
            firstBarMarginLeft: 4 * this.commonMargin,
            lastBarMarginRight: width - this.commonMargin,
            xAxisHorizontalMargin: -0.5 * this.commonMargin,
            yAxisHorizontalMargin: 3 * this.commonMargin,
            xAxisVerticalMargin: height + 0.2 * this.commonMargin
        };
    }
}
