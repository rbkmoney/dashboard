import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { select } from 'd3-selection';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { easeExp } from 'd3-ease';
import { Axis, axisBottom, AxisDomain, axisLeft } from 'd3-axis';
import { locale } from 'moment';

import { chartColors } from '../color-constants';
import { BarChartConfig, ChartService, LegendTooltipData, LegendTooltipItem, PeriodData, PeriodValue } from '../models/chart-data-models';
import { BarType } from './bar-chart.component';
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';

@Injectable()
export class BarChartService implements ChartService<PeriodData, BarChartConfig> {
    private svg: BarType;
    private element: HTMLElement;
    private xScale0: ScaleBand<string>;
    private xScale1: ScaleBand<string>;
    private yScale: ScaleLinear<number, number>;
    private xAxis: Axis<string>;
    private yAxis: Axis<AxisDomain>;
    private config: BarChartConfig;

    private isInitialized = false;

    constructor(private legendTooltipService: LegendTooltipService) {}

    initChart(data: PeriodData[], element: HTMLElement, config?: BarChartConfig) {
        this.config = config ? config : new BarChartConfig(element.offsetWidth, element.offsetHeight);
        this.element = element;

        this.svg = select(element)
            .select('svg')
            .attr('width', this.config.width)
            .attr('height', this.config.height + this.config.commonMargin)
            .attr('transform', `translate(0, 0)`) as BarType;

        this.xScale0 = scaleBand().range([
            this.config.margin.firstBarMarginLeft,
            this.config.margin.lastBarMarginRight
        ]);

        this.xScale1 = scaleBand();

        this.yScale = scaleLinear().range([this.config.height, 0]);

        this.yScale.domain([
            0,
            max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(this.config.tickCount)[1]
        ]);

        this.xAxis = this.getCustomAxisX();
        this.yAxis = this.getCustomAxisY();

        this.initAxis();

        this.isInitialized = true;
        this.updateChart(data);
    }

    updateChart(data: PeriodData[]) {
        if (this.isInitialized) {
            this.xScale0.domain(data.map(d => d.time));

            const xFields = this.getX1Fields(data);
            this.xScale1.domain(xFields).range([0, this.getDomainRangeX(xFields.length)]);

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

    private updateAxis(data: PeriodData[]) {
        select(this.element)
            .select('.x.axis')
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .call(this.xAxis.tickValues([data[0].time, data[data.length - 1].time]) as any);
        select(this.element)
            .select('.y.axis')
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .call(this.yAxis as any);
    }

    private updateData(data: PeriodData[]) {
        this.svg
            .selectAll('.time')
            .data<PeriodData>(data)
            .attr('x', d => this.xScale0(d.time))
            .selectAll('.bar')
            .data(d => d.values)
            .style('fill', (d, i) => chartColors[i])
            .on('mouseover', (d, i, x) => {
                const legendTooltipData = this.getLegendTooltipData(data, d);
                this.legendTooltipService.showLegendTooltip(legendTooltipData, this.element);
            })
            .on('mouseout', () => {
                this.legendTooltipService.removeLegend(this.element);
            })
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .attr('d', d =>
                this.getRoundedBar(
                    d,
                    this.config.height - this.yScale(d.value) - this.config.radius,
                    this.yScale(d.value) + this.config.radius,
                    this.config.barWidth
                )
            );

        this.removeUnusedData(data);
        this.drawNewData(data);
    }

    private removeUnusedData(data: PeriodData[]) {
        this.svg
            .selectAll('.time')
            .data(data)
            .attr('transform', d => `translate(${this.xScale0(d.time)}, 0)`)
            .exit()
            .remove();
    }

    private drawNewData(data: PeriodData[]) {
        this.svg
            .selectAll(`.time`)
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
            .on('mousemove', (d) => {

                const legendTooltipData = this.getLegendTooltipData(data, d);
                this.legendTooltipService.showLegendTooltip(legendTooltipData, this.element);
            })
            .on('mouseout', () => {
                this.legendTooltipService.removeLegend(this.element);
            })
            .attr('d', d => this.getRoundedBar(d, 0, this.config.height, this.config.barWidth))
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
            .attr('d', d =>
                this.getRoundedBar(
                    d,
                    this.config.height - this.yScale(d.value) - this.config.radius,
                    this.yScale(d.value) + this.config.radius,
                    this.config.barWidth
                )
            );
    }

    private getLegendTooltipData(data: PeriodData[], value: PeriodValue): LegendTooltipData {
        const dataIndex = data.findIndex((val) => val.values.includes(value));
        const date = data[dataIndex].time;
        const values: LegendTooltipItem[] = [];
        if (data) {
            data[dataIndex].values.forEach((item, index) => {
                values.push({
                    name: item.name,
                    value: item.value,
                    color: chartColors[index]
                });
            });
        }
        return { date, values };
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
            .tickSize(-this.config.width)
            .tickFormat(d => `${d}`);
    }

    private getDomainRangeX(length: number): number {
        return length * this.config.barWidth + (length - 1) * this.config.barPadding;
    }



}
