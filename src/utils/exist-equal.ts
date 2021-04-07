import isNil from 'lodash-es/isNil';

export function existEqual<T>(a: T, b: T) {
    return !isNil(a) && !isNil(b) && a === b;
}
