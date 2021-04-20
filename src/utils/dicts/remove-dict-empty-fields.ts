import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';

import { isString } from '../is-string';
import { removeDictFields } from './remove-dict-fields';

export function removeDictEmptyFields<T>(dict: T): Partial<T> {
    return removeDictFields(dict, (value: unknown) => {
        return isObject(value) || isString(value) ? !isEmpty(value) : !isNil(value);
    });
}
