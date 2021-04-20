import isEmpty from 'lodash-es/isEmpty';
import isObject from 'lodash-es/isObject';

import { isNil } from '../is-nil';
import { removeDictFields } from './remove-dict-fields';

export function removeDictEmptyFields<T>(dict: T): Partial<T> {
    return removeDictFields(dict, (value: unknown) => {
        return isObject(value) || (value && typeof value.valueOf() === 'string') ? !isEmpty(value) : !isNil(value);
    });
}
