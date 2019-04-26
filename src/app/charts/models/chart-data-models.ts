export interface PeriodData {
    time: string;
    values: PeriodValue[];
}

export interface PeriodValue {
    name: string;
    value: number;
}

export interface SegmentData {
    name: string;
    value: number;
}

export class DonutChartConfig {
    radius: number;
    innerRadius: number;
    padAngle: number;
    cornerRadius: number;
    transitionDuration: number;

    constructor(radius: number, donutWidth = 0.04, padAngle = 0.05, transitionDuration = 1000) {
        this.radius = radius;
        this.innerRadius = (1 - donutWidth) * radius;
        this.padAngle = padAngle;
        this.cornerRadius = radius;
        this.transitionDuration = transitionDuration;
    }
}

export class BarChartConfig {
    barWidth: number;
    barPadding: number;
    radius: number;
    tickCount: number;
    transitionDuration: number;
    commonMargin: number;

    constructor(barWidth = 5, barPadding = 3, tickCount = 5, transitionDuration = 1000, commonMargin = 20) {
        this.barWidth = barWidth;
        this.barPadding = barPadding;
        this.radius = barWidth / 2;
        this.tickCount = tickCount;
        this.transitionDuration = transitionDuration;
        this.commonMargin = commonMargin;
    }
}
