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
