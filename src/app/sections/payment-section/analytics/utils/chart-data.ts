export interface Series {
    name?: string;
    data: {
        x: any;
        y: any;
        fillColor?: string;
        strokeColor?: string;
    }[]
}

export interface ChartData {
    currency: string;
    series: Series[];
}
