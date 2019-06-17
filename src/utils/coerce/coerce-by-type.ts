import {
    coerceBooleanProperty,
    coerceNumberProperty,
    coerceCssPixelValue,
    coerceArray as coerceArrayProperty,
    coerceElement as coerceElementProperty
} from '@angular/cdk/coercion';

import { coerce } from './coerce';

export const coerceBoolean = coerce(coerceBooleanProperty);
export const coerceNumber = coerce(coerceNumberProperty);
export const coerceArray = coerce(coerceArrayProperty);
export const coercePixel = coerce(coerceCssPixelValue);
export const coerceElement = coerce(coerceElementProperty);
