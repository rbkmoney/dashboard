import { TextMaskConfig } from 'angular2-text-mask';

export interface FormatInputConfig<I = string, E = string> {
    mask: TextMaskConfig;
    placeholder?: string;
    sizeFromPlaceholder?: boolean;
    size?: number;
    prefix?: string;
    postfix?: string;
    toPublicValue?: (value: I) => E;
    toInternalValue?: (value: E) => I;
}
