import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { Arc, arc, DefaultArcObject, Pie, pie, PieArcDatum } from 'd3-shape';
import { select, Selection } from 'd3-selection';
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

    private radius: number;
    private svg: Selection<SVGGElement, {}, null, undefined>;
    private generatePieData: Pie<void, SegmentData>;
    private generateArc: Arc<void, PieArcDatum<SegmentData> | DefaultArcObject>;
    private donut: Selection<any, PieArcDatum<SegmentData>, SVGGElement, {}>;

    private innerRadius = 0.96; // percent of radius
    private padAngle = 0.05;
    private cornerRadius = 4;

    constructor() {}

    ngOnInit() {
        this.createChart();
        this.createChartTransition();
    }

    ngOnChanges(changes: any) {
        if (this.donut) {
            this.updateChart();
        }
    }

    createChart() {
        const container = this.chartContainer.nativeElement;
        const size = container.offsetWidth;
        this.radius = size / 2;

        d3.select(container)
            .select('svg')
            .selectAll('*')
            .remove();

        this.generatePieData = pie<void, SegmentData>()
            .sort(null)
            .value(d => d.value);

        this.svg = select(container)
            .select('svg')
            .attr('height', size)
            .attr('width', size)
            .append('g')
            .attr('transform', `translate(${this.radius}, ${this.radius})`)
            .attr('class', 'donutChart');

        const generatedData = this.generatePieData(this.data);

        this.generateArc = arc()
            .innerRadius(this.radius * this.innerRadius)
            .outerRadius(this.radius)
            .padAngle(this.padAngle)
            .cornerRadius(this.cornerRadius);

        this.donut = this.svg
            .selectAll('.arc')
            .data(generatedData)
            .enter()
            .append('path')
            .attr('id', () => 'segment')
            .attr('fill', (d, i) => chartColors[i])
            .attr('periodData-index', (d, i) => i)
            .style('stroke-width', 1);

        this.updateChart();
    }

    updateChart() {
        this.donut = this.donut.data(this.generatePieData(this.data));
        this.updateChartTransition();
    }

    private createChartTransition() {
        const generateArc = this.generateArc;
        return this.donut
            .transition()
            .ease(easeExp)
            .duration(1500)
            .attrTween('d', b => {
                const i = interpolate({ startAngle: 0, endAngle: 0 }, b);
                return t => generateArc(i(t));
            });
    }

    private updateChartTransition() {
        const generateArc = this.generateArc;
        return this.donut
            .transition()
            .ease(easeExp)
            .duration(750)
            .attrTween('d', function(d) {
                const i = interpolate(this._current, d);
                this._current = i(0);
                return t => generateArc(i(t));
            });
    }
}
