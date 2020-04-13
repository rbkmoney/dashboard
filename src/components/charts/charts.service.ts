import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { axisBottom, axisLeft } from 'd3-axis';
import { easeExp } from 'd3-ease';
import { select } from 'd3-selection';
import { locale } from 'moment';

import { BarType } from './bar-chart/bar-chart.component';
import { DonutSvgType } from './donut-chart/donut-chart.service';
import { LinearChartSvgType } from './linear-chart/linear-chart.service';
import { PeriodData, SegmentData, SVGInitConfig } from './models/chart-data-models';

export type ChartSVG = BarType | DonutSvgType | LinearChartSvgType;

@Injectable()
export class ChartsService {
    private loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
        ' '
    );
    getRandom = (n = 1000000) => Math.ceil(Math.random() * n);

    getPeriodData = (timesCount: number, valuesCount: number): PeriodData[] => {
        const periodData = [];
        const additionalIndex = this.getRandom(20);
        for (let i = 1; i <= timesCount; i++) {
            const values = [];
            for (let j = 0; j < valuesCount; j++) {
                values.push({
                    name: this.loremIpsum[j + additionalIndex],
                    value: this.getRandom()
                });
            }
            periodData.push({
                time: `2017-01-${i > 9 ? i : `0${i}`}T00:00:00Z`,
                values
            });
        }
        return periodData;
    };

    getSegmentData = (n): SegmentData[] => {
        const data: SegmentData[] = [];
        for (let i = 0; i < n; i++) {
            data.push({
                name: this.loremIpsum[this.getRandom(this.loremIpsum.length - 1)],
                value: this.getRandom()
            });
        }
        return data;
    };

    getSVG(c: SVGInitConfig): ChartSVG {
        return select(c.element)
            .select('svg')
            .attr('height', c.height)
            .attr('width', c.width)
            .attr('transform', `translate(${c.horizontalTransform}, ${c.verticalTransform})`) as ChartSVG;
    }

    initAxis(svg, config) {
        svg.append('g')
            .attr('class', 'x axis')
            .attr(
                'transform',
                `translate(${config.margin.xAxisHorizontalMargin}, ${config.margin.xAxisVerticalMargin})`
            );

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${config.margin.yAxisHorizontalMargin}, 0)`);
    }

    getCustomAxisX(xScale) {
        return axisBottom(xScale)
            .tickSize(0)
            .tickFormat(d => formatDate(d as string, 'dd.MM.yyyy', locale()));
    }

    getCustomAxisY(yScale, config) {
        return axisLeft(yScale)
            .ticks(config.tickCount)
            .tickSize(-config.width)
            .tickFormat(d => `${d}`);
    }

    updateAxis(element, transitionDuration, tickValues, xAxis, yAxis) {
        select(element)
            .select('.x.axis')
            .transition()
            .ease(easeExp)
            .duration(transitionDuration)
            .call(xAxis.tickValues(tickValues) as any);

        select(element)
            .select('.y.axis')
            .transition()
            .ease(easeExp)
            .duration(transitionDuration)
            .call(yAxis as any);
    }
}
