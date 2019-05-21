import { Injectable } from '@angular/core';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';
import { easeExp } from 'd3-ease';
import { Axis, AxisDomain } from 'd3-axis';

import { chartColors } from '../color-constants';
import { BarChartConfig, ChartService, PeriodData, SVGInitConfig } from '../models/chart-data-models';
import { BarType } from './bar-chart.component';
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';
import { ChartsService } from '../charts.service';
import { getPeriodLegendTooltipData } from '../chart-utils';

@Injectable()
export class BarChartService implements ChartService<PeriodData, BarChartConfig> {
    private svg: BarType;
    private element: HTMLElement;
    private xScale0: ScaleBand<string>;
    private xScale1: ScaleBand<string>;
    private yScale: ScaleLinear<number, number>;
    private xAxis: Axis<AxisDomain>;
    private yAxis: Axis<AxisDomain>;
    private config: BarChartConfig;

    private isInitialized = false;

    constructor(private chartsService: ChartsService, private legendTooltipService: LegendTooltipService) {}

    initChart(data: PeriodData[], element: HTMLElement, config?: BarChartConfig) {
        this.config = config ? config : new BarChartConfig(element.offsetWidth, element.offsetHeight);
        this.element = element;

        const svgConfig = new SVGInitConfig(element, this.config.width, this.config.height + this.config.commonMargin);

        this.svg = this.chartsService.getSVG(svgConfig) as BarType;

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

        this.xAxis = this.chartsService.getCustomAxisX(this.xScale0);
        this.yAxis = this.chartsService.getCustomAxisY(this.yScale, this.config);

        this.chartsService.initAxis(this.svg, this.config);

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

            this.chartsService.updateAxis(
                this.element,
                this.config.transitionDuration,
                extent(data, d => d.time),
                this.xAxis,
                this.yAxis
            );

            this.updateData(data);
        }
    }

    private updateData(data: PeriodData[]) {
        const timeScale = this.svg
            .selectAll('.time')
            .data<PeriodData>(data)
            .attr('x', d => this.xScale0(d.time));

        const describeBars = timeScale
            .selectAll('.bar')
            .data(d => d.values)
            .style('fill', (d, i) => chartColors[i]);

        const describeTooltip = describeBars
            .on('mousemove', d => {
                const legendTooltipData = getPeriodLegendTooltipData(data, d);
                this.legendTooltipService.showLegendTooltip(legendTooltipData, this.element);
            })
            .on('mouseout', () => {
                this.legendTooltipService.removeLegend(this.element);
            });

        const drawBars = describeTooltip
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
        this.drawData(data);
    }

    private removeUnusedData(data: PeriodData[]) {
        this.svg
            .selectAll('.time')
            .data(data)
            .attr('transform', d => `translate(${this.xScale0(d.time)}, 0)`)
            .exit()
            .remove();
    }

    private drawData(data: PeriodData[]) {
        const timesGroup = this.svg
            .selectAll(`.time`)
            .data<PeriodData>(data)
            .enter();

        const drawTimes = timesGroup
            .append('g')
            .attr('class', `time`)
            .attr('transform', d => `translate(${this.xScale0(d.time)}, 0)`);

        const describeBars = drawTimes
            .selectAll(`path`)
            .data(d => d.values)
            .enter()
            .append('path')
            .attr('class', `bar`)
            .style('fill', (d, i) => chartColors[i]);

        const desctibeTooltip = describeBars
            .on('mousemove', d => {
                const legendTooltipData = getPeriodLegendTooltipData(data, d);
                this.legendTooltipService.showLegendTooltip(legendTooltipData, this.element);
            })
            .on('mouseout', () => {
                this.legendTooltipService.removeLegend(this.element);
            });

        const drawBars = desctibeTooltip
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

    private getDomainRangeX(length: number): number {
        return length * this.config.barWidth + (length - 1) * this.config.barPadding;
    }
}
