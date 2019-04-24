import { Injectable } from '@angular/core';
import { select, Selection } from 'd3-selection';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { easeExp } from 'd3-ease';
import { Axis, axisBottom, AxisDomain, axisLeft } from 'd3-axis';
import { formatDate } from '@angular/common';
import { locale } from 'moment';

import { chartColors } from '../color-constants';
import { BarChartConfig, PeriodData } from '../models/chart-data-models';

@Injectable()
export class BarChartService {
    private xScale0: ScaleBand<string>;
    private xScale1: ScaleBand<string>;
    private yScale: ScaleLinear<number, number>;
    private xAxis: Axis<string>;
    private yAxis: Axis<AxisDomain>;
    private height: number;
    private width: number;
    private transitionDuration = 1000;
    private commonMargin = 20;
    private config: BarChartConfig;
    private margin;

    initChart(
        svg: Selection<SVGGElement, {}, null, PeriodData>,
        data: PeriodData[],
        element: HTMLElement,
        config?: BarChartConfig
    ) {
        this.width = element.offsetWidth;
        this.height = element.offsetHeight - this.commonMargin;
        this.margin = this.initMargins(this.width, this.height);
        this.config = this.initChartConfig(config);

        svg = select(element)
            .select('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .attr('transform', `translate(0, 0)`) as Selection<SVGGElement, {}, null, PeriodData>;

        this.xScale0 = scaleBand().range([this.margin.firstBarMarginLeft, this.margin.lastBarMarginRight]);

        this.xScale1 = scaleBand();

        this.yScale = scaleLinear().range([this.height, 0]);

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.config.tickCount)[1]
        ]);

        this.xAxis = this.getCustomAxisX();
        this.yAxis = this.getCustomAxisY();

        this.initAxis(svg);

        return this.updateChart(svg, data, element);
    }

    updateChart(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[], element: HTMLElement) {
        this.xScale0.domain(data.map(d => d.time));

        const xFields = this.getX1Fields(data);
        this.xScale1.domain(xFields).range([0, this.getDomainRangeX(xFields.length)]);

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.config.tickCount)[1]
        ]);

        this.updateAxis(data, element);
        this.updateData(svg, data);

        return svg;
    }

    private initAxis(svg: Selection<SVGGElement, {}, null, PeriodData>) {
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${this.margin.xAxisHorizontalMargin}, ${this.margin.xAxisVerticalMargin})`);

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.margin.yAxisHorizontalMargin}, 0)`);
    }

    private updateAxis(data: PeriodData[], element: HTMLElement) {
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

    private updateData(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[]) {
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
                    this.height - this.yScale(d.value) - this.config.radius,
                    this.yScale(d.value) + this.config.radius,
                    this.config.barWidth
                )
            )
            .style('fill', (d, i) => chartColors[i]);

        this.removeUnusedData(svg, data);
        this.drawNewData(svg, data);
    }

    private removeUnusedData(svg: Selection<SVGGElement, {}, null, PeriodData>, data: PeriodData[]) {
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
            .attr('d', d => this.getRoundedBar(d, 0, this.height, this.config.barWidth))
            .transition()
            .ease(easeExp)
            .duration(this.transitionDuration)
            .attr('d', d =>
                this.getRoundedBar(
                    d,
                    this.height - this.yScale(d.value) - this.config.radius,
                    this.yScale(d.value) + this.config.radius,
                    this.config.barWidth
                )
            );
    }

    private getX1Fields(data): Array<string> {
        return data[0].values.map(i => i.name);
    }

    private getRoundedBar(d, height: number, y: number, barWidth: number): string {
        return `
                M${this.xScale1(d.name)},${y}
                a${this.config.radius},${this.config.radius} 0 0 1 ${this.config.radius},${-this.config.radius}
                h${barWidth - 2 * this.config.radius}
                a${this.config.radius},${this.config.radius} 0 0 1 ${this.config.radius},${this.config.radius}
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
            .ticks(this.config.tickCount)
            .tickSize(-this.width)
            .tickFormat(d => `${d}`);
    }

    private getDomainRangeX(length: number): number {
        return length * this.config.barWidth + (length - 1) * this.config.barPadding;
    }

    private initMargins(width: number, height: number) {
        return {
            firstBarMarginLeft: 4 * this.commonMargin,
            lastBarMarginRight: width - this.commonMargin,
            xAxisHorizontalMargin: -0.5 * this.commonMargin,
            xAxisVerticalMargin: height + 0.2 * this.commonMargin,
            yAxisHorizontalMargin: 3 * this.commonMargin
        };
    }

    private initChartConfig(config: BarChartConfig = { barWidth: 5, barPadding: 3, tickCount: 5 }): BarChartConfig {
        return {
            barWidth: config.barWidth,
            barPadding: config.barPadding,
            radius: config.barWidth / 2,
            tickCount: config.tickCount
        };
    }
}
