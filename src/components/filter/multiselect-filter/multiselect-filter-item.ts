export interface MultiselectFilterItem<T = any> {
    id: string | number;
    label: string;
    data?: T;
}
