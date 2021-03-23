import { CSS_UNIT_PATTERN, DEFAULT_INDENT_UNITS } from '../consts';

export const parseIndentValue = (value: number | string): [number, string] => {
    let indent: number = Number(value);
    let units = DEFAULT_INDENT_UNITS;

    if (typeof value === 'string') {
        const parts = value.split(CSS_UNIT_PATTERN);
        indent = Number(parts[0]);
        units = parts[1] || units;
    }

    if (isNaN(indent)) {
        throw new Error(`Сan't parse non numeric indent`);
    }

    return [indent, units];
};
