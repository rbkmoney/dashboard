import { Injectable } from '@angular/core';
import { select, Selection } from 'd3-selection';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { easeExp } from 'd3-ease';
import { Axis, axisBottom, AxisDomain, axisLeft } from 'd3-axis';
import { formatDate } from '@angular/common';
import { locale } from 'moment';

import { chartColors } from '../color-constants';
import { PeriodData } from '../models/chart-data-models';

@Injectable()
export class BarChartService {
    private xScale0: ScaleBand<string>;
    private xScale1: ScaleBand<string>;
    private yScale: ScaleLinear<number, number>;
    private xAxis: Axis<string>;
    private yAxis: Axis<AxisDomain>;
    private height: number;
    private width: number;
    private margin = 20;
    private barWidth = 5;
    private barPadding = 3;
    private transitionDuration = 1000;
    private rx = 3;
    private ry = 3;
    private tickCount = 5;
    private firstBarMarginLeft: number;
    private lastBarMarginRight: number;
    private xAxisHorizontalMargin: number;
    private yAxisHorizontalMargin: number;
    private xAxisVerticalMargin: number;

    initChart(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[], element) {
        this.width = element.offsetWidth;
        this.height = element.offsetHeight - this.margin;
        this.initMargins();

        svg = select(element)
            .select('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .attr('transform', `translate(0, 0)`) as Selection<SVGGElement, {}, null, PeriodData>;

        this.xScale0 = scaleBand().range([this.firstBarMarginLeft, this.lastBarMarginRight]);

        this.xScale1 = scaleBand();

        this.yScale = scaleLinear().range([this.height, 0]);

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.tickCount)[1]
        ]);

        this.xAxis = this.getCustomAxisX();
        this.yAxis = this.getCustomAxisY();

        this.initAxis(svg);

        return this.updateChart(svg, data, element);
    }

    updateChart(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[], element) {
        this.xScale0.domain(data.map(d => d.time));

        const xFields = this.getX1Fields(data);
        this.xScale1.domain(xFields).range([0, this.getDomainRangeX(xFields.length)]);

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.tickCount)[1]
        ]);

        this.updateAxis(data, element);
        this.updateOldData(svg, data);
        this.removeOldData(svg, data);
        this.drawNewData(svg, data);

        return svg;
    }

    private initAxis(svg: Selection<SVGGElement, {}, null, PeriodData>) {
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${this.xAxisHorizontalMargin}, ${this.xAxisVerticalMargin})`);

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.yAxisHorizontalMargin}, 0)`);
    }

    private updateAxis(data: PeriodData[], element) {
        select(element)
            .select('.x.axis')
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .call(this.xAxis.tickValues([data[0].time, data[data.length - 1].time]) as any);
        select(element)
            .select('.y.axis')
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .call(this.yAxis as any);
    }

    private updateOldData(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[]) {
        svg.selectAll('.time')
            .data<PeriodData>(data)
            .attr('x', d => this.xScale0(d.time))
            .selectAll('.bar')
            .data(d => d.values)
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .attr('d', d =>
                this.getRoundedBar(
                    d,
                    this.rx,
                    this.ry,
                    this.height - this.yScale(d.value) - this.ry,
                    this.yScale(d.value) + this.ry,
                    this.barWidth
                )
            )
            .style('fill', (d, i) => chartColors[i]);
    }

    private removeOldData(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[]) {
        svg.selectAll('.time')
            .data(data)
            .attr('transform', d => `translate(${this.xScale0(d.time)}, 0)`)
            .exit()
            .remove();
    }

    private drawNewData(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[]) {
        svg.selectAll(`.time`)
            .data<PeriodData>(data)
            .enter()
            .append('g')
            .attr('class', `time`)
            .attr('transform', d => `translate(${this.xScale0(d.time)}, 0)`)
            .selectAll(`path`)
            .data(d => d.values)
            .enter()
            .append('path')
            .attr('class', `bar`)
            .style('fill', (d, i) => chartColors[i])
            .attr('d', d => this.getRoundedBar(d, this.rx, this.ry, 0, this.height, this.barWidth))
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .attr('d', d =>
                this.getRoundedBar(
                    d,
                    this.rx,
                    this.ry,
                    this.height - this.yScale(d.value) - this.ry,
                    this.yScale(d.value) + this.ry,
                    this.barWidth
                )
            );
    }

    private getX1Fields(data): Array<string> {
        return data[0].values.map(i => i.name);
    }

    private getRoundedBar(d, rx: number, ry: number, height: number, y: number, barWidth: number): string {
        return `
                M${this.xScale1(d.name)},${y}
                a${rx},${ry} 0 0 1 ${rx},${-ry}
                h${barWidth - 2 * rx}
                a${rx},${ry} 0 0 1 ${rx},${ry}
                v${height}
                h${-barWidth}Z
              `;
    }

    private getCustomAxisX() {
        return axisBottom(this.xScale0)
            .tickSize(0)
            .tickFormat(d => formatDate(d as string, 'dd.MM.yyyy', locale()));
    }

    private getCustomAxisY() {
        return axisLeft(this.yScale)
            .ticks(this.tickCount)
            .tickSize(-this.width)
            .tickFormat(d => `${d}`);
    }

    private getDomainRangeX(length: number): number {
        return length * this.barWidth + (length - 1) * this.barPadding;
    }

    private initMargins() {
        this.firstBarMarginLeft = 4 * this.margin;
        this.lastBarMarginRight = this.width - this.margin;
        this.xAxisHorizontalMargin = -0.5 * this.margin;
        this.yAxisHorizontalMargin = 3 * this.margin;
        this.xAxisVerticalMargin = this.height + 0.2 * this.margin;
    }
}
