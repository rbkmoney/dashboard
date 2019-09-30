import isEmpty from 'lodash.isempty';

export const removeEmptyProperties = <T>(obj: Object) =>
    Object.keys(obj).reduce((acc, cur) => (!isEmpty(obj[cur]) ? { ...acc, [cur]: obj[cur] } : acc), {} as T);
