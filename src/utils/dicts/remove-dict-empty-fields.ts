import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';

import { removeDictFields } from './remove-dict-fields';

export function removeDictEmptyFields<T>(dict: T): Partial<T> {
    return removeDictFields(dict, (value: unknown) => {
        return isObject(value) || isString(value) ? !isEmpty(value) : !isNil(value);
    });
}
