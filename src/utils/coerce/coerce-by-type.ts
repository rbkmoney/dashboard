import {
    coerceArray as coerceArrayProperty,
    coerceBooleanProperty,
    coerceCssPixelValue,
    coerceElement as coerceElementProperty,
    coerceNumberProperty
} from '@angular/cdk/coercion';

import { coerce } from './coerce';

export function coerceBoolean(target, key) {
    return coerce(coerceBooleanProperty)(target, key);
}

export function coerceNumber(target, key) {
    return coerce(coerceNumberProperty)(target, key);
}

export function coerceArray(target, key) {
    return coerce(coerceArrayProperty)(target, key);
}

export function coercePixel(target, key) {
    return coerce(coerceCssPixelValue)(target, key);
}

export function coerceElement(target, key) {
    return coerce(coerceElementProperty)(target, key);
}
