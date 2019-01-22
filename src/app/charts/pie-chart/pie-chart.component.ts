import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { arc, DefaultArcObject, pie, PieArcDatum } from 'd3-shape';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';
import { easeElastic, easeLinear } from 'd3-ease';

export interface PieChartData {
    value: number;
    caption: string;
    color?: string;
}

export interface InternalPieChartData extends PieChartData {
    value: number;
    color?: string;
    path?: string;
    textPosition?: [number, number];
}

@Component({
    selector: 'dsh-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges, OnInit {
    @Input() data: Array<PieChartData> = [];

    @Input() width = 200;

    @Input() height = 200;

    @Input() radius = Math.min(this.width, this.height) / 2;

    public chartData!: (PieArcDatum<InternalPieChartData> & DefaultArcObject)[];

    constructor() {}

    ngOnInit(): void {
        const pieChartDataGenerator = pie<PieChartData>()
            .sort(null)
            .value((d: PieChartData) => d.value);

        const x: PieArcDatum<InternalPieChartData>[] = pieChartDataGenerator(this.data);

        this.chartData = x.map(element => {
            return {
                ...element,
                innerRadius: this.radius * 0.95,
                outerRadius: this.radius,
                cornerRadius: this.radius * 0.0005
            };
        });

        const pieChartElement = select('svg')
            .append('g')
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
            .attr('class', 'pieChart');

        const arc2 = arc()
            .innerRadius(this.radius * 0.95)
            .outerRadius(this.radius)
            .padAngle(this.radius * 0.0005)
            .cornerRadius(this.radius * 0.05);

        const pies = pieChartElement
            .selectAll('.arc')
            .data(this.chartData)
            .enter()
            .append('path')
            .attr('id', function(d, i) {
                return 'segment' + i;
            })
            .attr('fill', function(d, i) {
                return d.data.color;
            })
            .attr('data-index', function(d, i) {
                return i;
            })
            .style('stroke-width', 1)
            .transition()
            .ease(easeElastic)
            .duration(2000)
            .attrTween('d', function(b) {
                const i = interpolate({ startAngle: 0, endAngle: 0 }, b);
                return function(t) {
                    return arc2(i(t));
                };
            });
    }

    ngOnChanges(changes: any): void {}
}
