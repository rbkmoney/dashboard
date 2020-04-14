import { Injectable } from '@angular/core';
import { easeExp } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { Selection } from 'd3-selection';
import { arc, Arc, DefaultArcObject, pie, Pie, PieArcDatum } from 'd3-shape';

import { ChartsService } from '../charts.service';
import { chartColors } from '../color-constants';
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';
import { ChartService, DonutChartConfig, SegmentData, SVGInitConfig } from '../models/chart-data-models';

export type DonutSvgType = Selection<SVGGElement, {}, null, undefined>;
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

    constructor(private chartsService: ChartsService, private legendTooltipService: LegendTooltipService) {}

    initChart(data: SegmentData[], element: HTMLElement, config?: DonutChartConfig) {
        this.element = element;
        this.config = config ? config : new DonutChartConfig(element.offsetWidth / 2);
        const size = this.config.radius * 2;

        this.generatePieData = pie<void, SegmentData>()
            .sort(null)
            .value(d => d.value);

        const svgConfig = new SVGInitConfig(element, size, size);

        const svg = this.chartsService.getSVG(svgConfig) as DonutSvgType;

        this.svg = svg
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
                .attr('fill', (_d, i) => chartColors[i])
                .attr('periodData-index', (_d, i) => i)
                .style('stroke-width', 1)
                .on('mousemove', (d, i) => {
                    const legendData = { values: [{ name: d.data.name, color: chartColors[i] }] };
                    this.legendTooltipService.showLegendTooltip(legendData, this.element);
                })
                .on('mouseout', () => {
                    this.legendTooltipService.removeLegend(this.element);
                });
            this.showChartTransition();
        }
    }

    private showChartTransition() {
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
    // tslint:disable-next-line: no-unused-variable
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
