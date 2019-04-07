import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { select } from 'd3-selection';

import { PeriodData } from '../models/chart-data-models';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { chartColors } from '../color-constants';
import { easeExp } from 'd3-ease';


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

    private svg: any;
    private margin = 30;
    private chart: any;
    private xScale0: any;
    private xScale1: any;
    private yScale: any;
    private xAxis: any;
    private yAxis: any;
    private height: number;
    private width: number;

    constructor() {}

    ngOnInit() {
        this.createChart();
    }

    ngOnChanges(changes: any) {
        if (this.svg) {
            this.updateChart();
        }
    }

    createChart() {
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - 2 * this.margin;
        this.height = element.offsetHeight - 2 * this.margin;

        this.svg = select(element)
            .select('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        this.xScale0 = scaleBand().range([0, this.width]).align(0.1).paddingInner(0.5).paddingOuter(0);

        this.xScale1 = scaleBand().paddingInner(0.05).paddingOuter(0);

        this.yScale = scaleLinear().range([this.height, 0]);

        this.xAxis = axisBottom(this.xScale0).tickSize(0);

        this.yAxis = axisLeft(this.yScale);

        this.xScale0.domain(this.data.map((d) => d.time));

        const xFields = this.getX1Fields();

        this.xScale1.domain(xFields).range([0, this.xScale0.bandwidth()]);

        this.yScale.domain([0, max(this.data.map((d) => max(d.values.map((x) => x.value))))]);

        const time = this.svg.selectAll('.time')
            .data(this.data)
            .enter()
            .append('g')
            .attr('class', 'time')
            .attr('transform', d => `translate(${this.xScale0(d.time)}, 0)`);

        // дабл цикл с нумерацией баров

        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].values.length; j++) {
                time.selectAll(`.bar${i}.value${j}`)
                    .data(d => [d])
                    .enter()
                    .append('rect')
                    .attr('class', `bar${i} value${j}`)
                    .style('fill', chartColors[j])
                    .transition()
                    .ease(easeExp)
                    .duration(1000)
                    .attr('x', this.xScale1(`value${j}`))
                    .attr('y', d => this.yScale(d.values[j].value))
                    .attr('width', 5)
                    .attr('height', d => this.height - this.yScale(d.values[j].value));
            }
        }

        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${this.margin},${this.height})`)
            .call(this.xAxis);

        this.svg.append('g')
            .attr('class', 'y axis')
            // .attr('transform', `translate(${this.margin},0)`)
            .call(this.yAxis);

        this.updateChart();
    }

    updateChart() {
        console.log(this.data);
        this.xScale0.domain(this.data.map((d) => d.time));

        const xFields = this.getX1Fields();

        this.xScale1.domain(xFields).range([0, this.xScale0.bandwidth()]);

        this.yScale.domain([0, max(this.data.map((d) => max(d.values.map((x) => x.value))))]);

        const update = this.svg.selectAll('.time').data(this.data);

        update.exit().remove();

        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].values.length; j++) {
                update.selectAll(`.bar${i}.value${j}`)
                    .transition()
                    .ease(easeExp)
                    .duration(1000)
                    // .attr('x', d => this.xScale1(d.time))
                    .attr('y', d => this.yScale(d.values[j].value))
                    // .attr('width', 5)
                    .attr('height', d => this.height - this.yScale(d.values[j].value))
                    .style('fill', chartColors[j]);
            }
        }

        // SHOW WRONG DATA

        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].values.length; j++) {
                update.selectAll(`.bar${i}.value${j}`)
                    .data(d => [d])
                    .enter()
                    .append('rect')
                    .style('fill', chartColors[j])
                    .transition()
                    .ease(easeExp)
                    .duration(1000)
                    .attr('x', this.xScale0(`value${j}`))
                    .attr('y', d => this.yScale(d.values[j].value))
                    .attr('width', 5)
                    .attr('height', d => this.height - this.yScale(d.values[j].value));
            }
        }
    }

    private getX1Fields(): Array<string> {
        const columnsCount = this.data[0].values.length;
        const fields = Array<string>();
        for (let i = 0; i < columnsCount; i++) {
            fields.push(`value${i}`);
        }
        return fields;
    }

    // createChart() {
    //     const element = this.chartContainer.nativeElement;
    //     this.width = element.offsetWidth - 2 * this.margin;
    //     this.height = element.offsetHeight - 2 * this.margin;
    //     const svg = select(element)
    //         .select('svg')
    //         .attr('width', element.offsetWidth + this.margin)
    //         .attr('height', element.offsetHeight + this.margin);
    //
    //     this.chart = svg
    //         .append('g')
    //         .attr('class', 'bars')
    //         .attr('transform', `translate(${this.margin}, ${this.margin})`);
    //
    //     const xDomain = this.data.map(d => d.time);
    //     const yDomain = [0, max(this.data, d => d.values[0].value)];
    //
    //     this.xScale = scaleBand()
    //         .padding(0.1)
    //         .domain(xDomain)
    //         .rangeRound([0, this.width]);
    //     this.y = scaleLinear()
    //         .domain(yDomain)
    //         .range([this.height, 0]);
    //
    //     this.xAxis = svg
    //         .append('g')
    //         .attr('class', 'axis axis-x')
    //         .attr('transform', `translate(${this.margin}, ${this.margin + this.height})`)
    //         .call(axisBottom(this.xScale));
    //     this.yAxis = svg
    //         .append('g')
    //         .attr('class', 'axis axis-y')
    //         .attr('transform', `translate(${this.margin}, ${this.margin})`)
    //         .call(axisLeft(this.y));
    // }
    //
    // updateChart() {
    //     this.xScale.domain(this.data.map(d => d.time));
    //     this.y.domain([0, max(this.data, d => d.values[0].value)]);
    //
    //     this.xAxis.transition().call(axisBottom(this.xScale));
    //     this.yAxis.transition().call(axisLeft(this.y));
    //
    //     const update = this.chart.selectAll('.bar').data(this.data);
    //
    //     update.exit().remove();
    //
    //     this.chart
    //         .selectAll('.bar')
    //         .transition()
    //         .attr('x', d => this.xScale(d.time))
    //         .attr('y', d => this.y(d.values[0].value))
    //         .attr('width', d => 5)
    //         .attr('height', d => this.height - this.y(d.values[0].value))
    //         .style('fill', (d, i) => chartColors[i]);
    //
    //     update
    //         .enter()
    //         .append('rect')
    //         .attr('class', 'bar')
    //         .attr('x', d => this.xScale(d.time))
    //         .attr('y', d => this.y(0))
    //         .attr('width', d => 5)
    //         .attr('height', 0)
    //         .style('fill', (d, i) => chartColors[i])
    //         .transition()
    //         .ease(easeExp)
    //         .duration(1000)
    //         .attr('y', d => this.y(d.values[0].value))
    //         .attr('height', d => this.height - this.y(d.values[0].value));
    // }

    toNormalDate(date: string): string {
        return date
            .substring(0, 10)
            .replace('-', '.')
            .replace('-', '.');
    }
}
