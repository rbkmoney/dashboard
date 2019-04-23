export interface PeriodData {
    time: string;
    values: PeriodValue[];
}

export interface PeriodValue {
    name: string;
    value: number;
}

export interface PreparedPeriodData {
    name: string;
    values: PreparedPeriodValue[];
}

export interface PreparedPeriodValue {
    time: Date;
    value: number;
}

export interface SegmentData {
    name: string;
    value: number;
}

export class DonutChartConfig {
    innerRadius: number;
    cornerRadius: number;

    constructor(
        public radius: number,
        public donutWidth = 0.04,
        public padAngle = 0.05,
        public transitionDuration = 1000
    ) {
        this.radius = radius;
        this.innerRadius = (1 - donutWidth) * radius;
        this.padAngle = padAngle;
        this.cornerRadius = radius;
        this.transitionDuration = transitionDuration;
    }
}

export class BarChartConfig {
    radius: number;
    margin: BarChartMargins;

    constructor(
        public width: number,
        public height: number,
        public barWidth = 5,
        public barPadding = 3,
        public tickCount = 5,
        public transitionDuration = 1000,
        public commonMargin = 20
    ) {
        this.radius = barWidth / 2;
        this.margin = {
            firstBarMarginLeft: 4 * commonMargin,
            lastBarMarginRight: this.width - commonMargin,
            xAxisHorizontalMargin: -0.5 * commonMargin,
            xAxisVerticalMargin: this.height + 0.2 * commonMargin,
            yAxisHorizontalMargin: 3 * commonMargin
        };
    }
}

export interface BarChartMargins {
    firstBarMarginLeft: number;
    lastBarMarginRight: number;
    xAxisHorizontalMargin: number;
    xAxisVerticalMargin: number;
    yAxisHorizontalMargin: number;
}

export interface ChartService<T, C> {
    initChart(data: T[], element: HTMLElement, config?: C);

    updateChart(data: T[]);
}
