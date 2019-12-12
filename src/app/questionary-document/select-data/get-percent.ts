import isEmpty from 'lodash.isempty';

export function getPercent(value: string | number): string {
    return isEmpty(value) ? null : `${value}%`;
}
