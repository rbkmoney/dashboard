import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { easeExp } from 'd3-ease';
import { select } from 'd3-selection';
import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

import { PeriodData } from '../models/chart-data-models';
import { chartColors } from '../color-constants';

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges, OnInit {
    @ViewChild('barChart')
    private chartContainer: ElementRef;

    @Input()
    data: PeriodData[];

    private margin = 30;
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private x0: any;
    private x1: any;
    private xAxis: any;
    private yAxis: any;

    constructor() {}

    ngOnInit() {
        this.createChart();
        if (this.chart) {
            this.updateChart();
        }
    }

    ngOnChanges(changes: any) {
        if (this.chart) {
            this.updateChart();
        }
    }

    createChart() {
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - 2 * this.margin;
        this.height = element.offsetHeight - 2 * this.margin;
        const svg = select(element)
            .select('svg')
            .attr('width', element.offsetWidth + this.margin)
            .attr('height', element.offsetHeight + this.margin);

        this.chart = svg
            .append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin}, ${this.margin})`);

        const xDomain = this.data.map(d => d.time);
        const yDomain = [0, max(this.data, d => d.values[0].value)];

        this.xScale = scaleBand()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([0, this.width]);
        this.yScale = scaleLinear()
            .domain(yDomain)
            .range([this.height, 0]);

        this.xAxis = svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin}, ${this.margin + this.height})`)
            .call(axisBottom(this.xScale));
        this.yAxis = svg
            .append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin}, ${this.margin})`)
            .call(axisLeft(this.yScale));
    }

    updateChart() {
        this.xScale.domain(this.data.map(d => d.time));
        this.yScale.domain([0, max(this.data, d => d.values[0].value)]);

        this.xAxis.transition().call(axisBottom(this.xScale));
        this.yAxis.transition().call(axisLeft(this.yScale));

        const update = this.chart.selectAll('.bar').data(this.data);

        update.exit().remove();

        this.chart
            .selectAll('.bar')
            .transition()
            .attr('x', d => this.xScale(d.time))
            .attr('y', d => this.yScale(d.values[0].value))
            .attr('width', d => 5)
            .attr('height', d => this.height - this.yScale(d.values[0].value))
            .style('fill', (d, i) => chartColors[i]);

        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => this.xScale(d.time))
            .attr('y', d => this.yScale(0))
            .attr('width', d => 5)
            .attr('height', 0)
            .style('fill', (d, i) => chartColors[i])
            .transition()
            .ease(easeExp)
            .duration(1000)
            .attr('y', d => this.yScale(d.values[0].value))
            .attr('height', d => this.height - this.yScale(d.values[0].value));
    }

    toNormalDate(date: string): string {
        return date
            .substring(0, 10)
            .replace('-', '.')
            .replace('-', '.');
    }
}
