export interface PeriodData {
    time: string,
    values: PeriodValue[]
}

export interface PeriodValue {
    name: string,
    value: number
}

export interface SegmentData {
    name: string,
    value: number
}
