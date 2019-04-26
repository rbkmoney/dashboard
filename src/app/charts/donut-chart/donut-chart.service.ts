import { Injectable } from '@angular/core';
import { select, Selection } from 'd3-selection';
import { arc, Arc, DefaultArcObject, pie, Pie, PieArcDatum } from 'd3-shape';
import { easeExp } from 'd3-ease';
import { interpolate } from 'd3-interpolate';

import { DonutChartConfig, SegmentData } from '../models/chart-data-models';
import { chartColors } from '../color-constants';

@Injectable()
export class DonutChartService {
    private svg: Selection<SVGGElement, {}, null, undefined>;
    private generatePieData: Pie<void, SegmentData>;
    private generateArc: Arc<void, PieArcDatum<SegmentData> | DefaultArcObject>;
    private donut: Selection<any, PieArcDatum<SegmentData>, SVGGElement, {}>;

    private config: DonutChartConfig;

    createChart(
        data: SegmentData[],
        element: HTMLElement,
        config?: DonutChartConfig
    ): Selection<any, PieArcDatum<SegmentData>, SVGGElement, {}> {
        const size = element.offsetWidth;
        this.config = config;

        select(element)
            .select('svg')
            .selectAll('*')
            .remove();

        this.generatePieData = pie<void, SegmentData>()
            .sort(null)
            .value(d => d.value);

        this.svg = select(element)
            .select('svg')
            .attr('height', size)
            .attr('width', size)
            .append('g')
            .attr('transform', `translate(${this.config.radius}, ${this.config.radius})`)
            .attr('class', 'donutChart');

        this.generateArc = arc()
            .innerRadius(this.config.innerRadius)
            .outerRadius(this.config.radius)
            .padAngle(this.config.padAngle)
            .cornerRadius(this.config.cornerRadius);

        return this.updateChart(data);
    }

    updateChart(data: SegmentData[]): Selection<any, PieArcDatum<SegmentData>, SVGGElement, {}> {
        if (this.donut) {
            this.donut.remove();
        }
        const generatedData = this.generatePieData(data);
        this.donut = this.svg
            .selectAll('.arc')
            .data(generatedData)
            .enter()
            .append('path')
            .attr('id', () => 'segment')
            .attr('fill', (d, i) => chartColors[i])
            .attr('periodData-index', (d, i) => i)
            .style('stroke-width', 1);
        this.createChartTransition();

        return this.donut;
    }

    private createChartTransition() {
        const generateArc = this.generateArc;
        return this.donut
            .transition()
            .ease(easeExp)
            .duration(this.config.transitionDuration)
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
