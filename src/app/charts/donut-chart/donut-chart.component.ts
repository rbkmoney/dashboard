import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { arc, pie } from 'd3-shape';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';
import { easeExp } from 'd3-ease';

import { SegmentData } from '../models/chart-data-models';
import * as d3 from 'd3';
import { chartColors } from '../color-constants';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnChanges, OnInit {
    @ViewChild('donutChart')
    private chartContainer: ElementRef;

    @Input()
    data: SegmentData[];

    radius;

    private myArc;
    private myPie;
    private arcs;
    private pies;
    private svg;

    constructor() {}

    ngOnInit() {
        this.createChart();
        this.showChartTransition();
    }

    ngOnChanges(changes: any) {
        if (this.pies) {
            this.updateChart();
        }
    }

    createChart() {
        const container = this.chartContainer.nativeElement;
        const width = container.offsetWidth;
        this.radius = width / 2;

        d3.select(container).select('svg').selectAll('*').remove();

        this.myPie = pie<void, SegmentData>().sort(null).value(d => d.value);

        this.svg = select(container).select('svg')
            .attr('height', width)
            .attr('width', width)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${width / 2})`)
            .attr('class', 'donutChart');

        this.arcs = this.myPie(this.data);

        this.myArc = arc()
            .innerRadius(this.radius * 0.96)
            .outerRadius(this.radius)
            .padAngle(0.05)
            .cornerRadius(4);

        this.pies = this.svg
            .selectAll('.arc')
            .data(this.arcs)
            .enter()
            .append('path')
            .attr('id', () => 'segment')
            .attr('fill', (d, i) => chartColors[i])
            .attr('periodData-index', (d, i) => i)
            .style('stroke-width', 1);

        this.updateChart();
    }

    updateChart() {
        this.pies = this.pies.data(this.myPie(this.data));
        this.updateChartTransition();
    }

    private showChartTransition() {
        const myArc = this.myArc;
        return this.pies.transition()
            .ease(easeExp)
            .duration(1500)
            .attrTween('d', (b) => {
                const i = interpolate({ startAngle: 0, endAngle: 0 }, b);
                return (t) => myArc(i(t));
            });
    }

    private updateChartTransition() {
        const myArc = this.myArc;
        return this.pies.transition()
            .ease(easeExp)
            .duration(750)
            .attrTween('d', function(d) {
                const i = interpolate(this._current, d);
                this._current = i(0);
                return (t) => myArc(i(t));
            });
    }

}
