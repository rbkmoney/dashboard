import isNil from 'lodash.isnil';

export const removeEmptyProperties = <T>(obj: T): T => Object.keys(obj).reduce((acc, cur) => (!isNil(obj[cur]) ? { ...acc, [cur]: obj[cur] } : acc), {} as T);