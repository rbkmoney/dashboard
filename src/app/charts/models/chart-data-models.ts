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

export interface DonutChartConfig {
    outerRadius: number;
    innerRadius: number;
    padAngle: number;
    cornerRadius: number;
}

export interface BarChartConfig {
    barWidth?: number;
    barPadding?: number;
    radius?: number;
    tickCount?: number;
}
