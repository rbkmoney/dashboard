export interface SelectorItem {
    value: 'today' | 'week' | 'month' | 'year' | 'more';
    checked: boolean;
    dicPath?: string;
}
