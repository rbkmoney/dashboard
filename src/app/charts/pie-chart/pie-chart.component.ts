import { Component, Input, OnChanges } from '@angular/core';
import { arc, DefaultArcObject, pie, PieArcDatum } from 'd3-shape';

export interface PieChartData {
    value: number;
    caption: string;
    color?: string;
}

export interface InternalPieChartData extends PieChartData {
    path?: string;
    textPosition?: [number, number];
}

@Component({
    selector: 'dsh-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {
    @Input() data: Array<PieChartData> = [];

    @Input() width = 200;

    @Input() height = 200;

    @Input() radius = Math.min(this.width, this.height) / 2;

    public chartData!: (PieArcDatum<InternalPieChartData> & DefaultArcObject)[];

    public center: string;

    constructor() {}

    ngOnChanges(changes: any): void {
        this.center = `translate(${this.width / 2}, ${this.height / 2})`;

        const pieChartDataGenerator = pie<PieChartData>()
            .sort(null)
            .value((d: PieChartData) => d.value);

        const svgPathGenerator = arc()
            .outerRadius(this.radius * 0.95)
            .innerRadius(this.radius * 0.9)
            .cornerRadius(this.radius * 0.05)
            .padAngle(this.radius * 0.0005);

        const x: PieArcDatum<InternalPieChartData>[] = pieChartDataGenerator(this.data);

        this.chartData = x.map(element => {
            return {
                ...element,
                innerRadius: this.radius - 40,
                outerRadius: this.radius
            };
        });

        this.chartData.forEach(d => {
            d.data.path = svgPathGenerator(d);
        });
    }
}
