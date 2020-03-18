import { chartColors } from './color-constants';
import {
    LegendItem,
    LegendTooltipData,
    LinearPeriodData,
    PeriodData,
    PeriodValue,
    SegmentData
} from './models/chart-data-models';

export const getPercentValue = (value: number, sum: number): number => Math.floor((value / sum) * 100 * 100) / 100;

export const periodToLinearData = (data: PeriodData[]): LinearPeriodData[] => {
    const preparedData: LinearPeriodData[] = [];
    data[0].values.forEach((v, i) => {
        preparedData[i] = {
            name: v.name,
            values: []
        };
    });
    preparedData.forEach((v, i) => {
        data.forEach(d => {
            v.values.push({ time: new Date(d.time), value: d.values[i].value });
        });
    });
    return preparedData;
};

export const getPeriodLegendData = (data: PeriodData[]): LegendItem[] => {
    const items: LegendItem[] = [];
    data[0].values.forEach((item, i) => {
        items.push({
            name: item.name,
            color: chartColors[i]
        });
    });
    return items;
};

export const getLinearLegendData = (data: LinearPeriodData[]): LegendItem[] => {
    const items: LegendItem[] = [];
    data.forEach((item, i) => {
        items.push({
            name: item.name,
            color: chartColors[i]
        });
    });
    return items;
};

export const getSegmentLegendData = (data: SegmentData[]): LegendItem[] => {
    let sum = 0;
    data.forEach(v => (sum += v.value));
    const items: LegendItem[] = [];
    data.forEach((item, i) => {
        items.push({
            name: item.name,
            color: chartColors[i],
            value: getPercentValue(item.value, sum)
        });
    });
    return items;
};

export const getLinearLegendTooltipData = (data: LinearPeriodData[], index: number): LegendTooltipData => {
    const date = data[0].values[index].time.toString();
    const values: LegendItem[] = [];
    if (data) {
        data.forEach((item, i) => {
            values.push({
                name: item.name,
                color: chartColors[i],
                value: item.values[index].value
            });
        });
    }
    return { date, values };
};

export const getPeriodLegendTooltipData = (data: PeriodData[], value: PeriodValue): LegendTooltipData => {
    const dataIndex = data.findIndex(val => val.values.includes(value));
    const date = data[dataIndex].time;
    const values: LegendItem[] = [];
    if (data) {
        data[dataIndex].values.forEach((item, index) => {
            values.push({
                name: item.name,
                color: chartColors[index],
                value: item.value
            });
        });
    }
    return { date, values };
};
