import { Option } from '../types';

export const defaultDisplayWith =
    <T>(options: Option<T>[]) =>
    (value: T): string =>
        options.find((option) => option.value === value)?.label;
