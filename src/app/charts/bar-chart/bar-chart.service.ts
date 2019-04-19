import { Injectable } from '@angular/core';
import { select, Selection } from 'd3-selection';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { easeExp } from 'd3-ease';
import { chartColors } from '../color-constants';
import { axisBottom, axisLeft } from 'd3-axis';
import { formatDate } from '@angular/common';
import { locale } from 'moment';

import { PeriodData } from '../models/chart-data-models';

@Injectable()
export class BarChartService {
    private svg: Selection<SVGGElement, {}, null, PeriodData>;
    private margin = 20;
    private xScale0: ScaleBand<string>;
    private xScale1: ScaleBand<string>;
    private yScale: ScaleLinear<number, number>;
    private xAxis: any;
    private yAxis: any;
    private height: number;
    private width: number;
    private barWidth = 5;
    private barPadding = 3;
    private transitionDuration = 1000;
    private rx = 3;
    private ry = 3;

    initChart(data: PeriodData[], element) {
        this.width = element.offsetWidth;
        this.height = element.offsetHeight - this.margin;

        this.svg = select(element)
            .select('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .attr('transform', `translate(0, 0)`) as Selection<SVGGElement, {}, null, PeriodData>;

        this.xScale0 = scaleBand().range([4 * this.margin, this.width - this.margin]);

        this.xScale1 = scaleBand();

        this.yScale = scaleLinear().range([this.height, 0]);

        this.yScale.domain([0, max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(5)[1]]);

        this.xAxis = this.getCustomAxisX();
        this.yAxis = this.getCustomAxisY();

        this.svg
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${-0.5 * this.margin}, ${this.height})`);

        this.svg
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${3 * this.margin}, 0)`);

        return this.updateChart(data);
    }

    updateChart(data: PeriodData[]) {
        this.xScale0.domain(data.map(d => d.time));

        const xFields = this.getX1Fields(data);
        this.xScale1.domain(xFields).range([0, this.getDomainRangeX(xFields.length)]);

        this.yScale.domain([0, max(data.map(d => max(d.values.map(x => x.value)))) + this.yScale.ticks(5)[1]]);

        select('.x.axis')
            .transition()
            .ease(easeExp)
            .duration(1000)
            .call(this.xAxis.tickValues([data[0].time, data[data.length - 1].time]));
        select('.y.axis')
            .transition()
            .ease(easeExp)
            .duration(1000)
            .call(this.yAxis);

        this.svg
            .selectAll('.time')
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

        this.svg
            .selectAll('.time')
            .data(data)
            .attr('transform', d => `translate(${this.xScale0(d.time)}, 0)`)
            .exit()
            .remove();

        return this.svg
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
            .attr('x', (d, i) => i * (this.barWidth + this.barPadding))
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
            .ticks(5)
            .tickSize(-this.width)
            .tickFormat((d, i) => (i > 0 ? `${(d as number) / 1000} млн ₽` : `${(d as number) / 1000}`));
    }

    private getDomainRangeX(length: number): number {
        return length * this.barWidth + (length - 1) * this.barPadding;
    }
}
