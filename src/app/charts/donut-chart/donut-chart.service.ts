import { Injectable } from '@angular/core';
import { select, Selection } from 'd3-selection';
import { arc, Arc, DefaultArcObject, pie, Pie, PieArcDatum } from 'd3-shape';
import { easeExp } from 'd3-ease';
import { interpolate } from 'd3-interpolate';

import { ChartService, DonutChartConfig, SegmentData } from '../models/chart-data-models';
import { chartColors } from '../color-constants';
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';

type DonutSvgType = Selection<SVGGElement, {}, null, undefined>;
type GeneratedPie = Pie<void, SegmentData>;
type GeneratedArc = Arc<void, PieArcDatum<SegmentData> | DefaultArcObject>;
type DonutType = Selection<any, PieArcDatum<SegmentData>, SVGGElement, {}>;

@Injectable()
export class DonutChartService implements ChartService<SegmentData, DonutChartConfig> {
    private svg: DonutSvgType;
    private element: HTMLElement;
    private generatePieData: GeneratedPie;
    private generateArc: GeneratedArc;
    private donut: DonutType;
    private config: DonutChartConfig;

    private isInitialized = false;

    constructor(private legendTooltipService: LegendTooltipService) {}

    initChart(data: SegmentData[], element: HTMLElement, config?: DonutChartConfig) {
        this.element = element;
        this.config = config;
        const size = config.radius * 2;

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

        this.isInitialized = true;
        this.updateChart(data);
    }

    updateChart(data: SegmentData[]) {
        if (this.isInitialized) {
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
                .style('stroke-width', 1)
                .on('mouseover', (d, i) => {
                    const legendData = { values: [{ name: d.data.name, color: chartColors[i] }] };
                    this.legendTooltipService.showLegendTooltip(legendData, this.element);
                })
                .on('mouseout', () => {
                    this.legendTooltipService.removeLegend(this.element);
                });
            this.createChartTransition();
        }
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

    // realtime transition, need for repairing a little
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
