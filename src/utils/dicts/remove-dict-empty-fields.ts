import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';

import { removeDictFields } from './remove-dict-fields';
export function removeDictEmptyFields<T>(dict: T): Partial<T> {
    return removeDictFields(dict, (value: unknown) => {
        return isObject(value) || typeof value === 'string' ? !isEmpty(value) : !isNil(value);
    });
}
