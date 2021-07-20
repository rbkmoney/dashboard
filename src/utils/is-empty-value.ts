import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';

export function isEmptyValue(v: unknown): boolean {
    return typeof v === 'object' ? isEmpty(v) : isNil(v);
}
