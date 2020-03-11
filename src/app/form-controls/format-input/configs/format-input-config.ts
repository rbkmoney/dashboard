import { TextMaskConfig } from 'angular2-text-mask';

export interface FormatInputConfig {
    mask: TextMaskConfig;
    placeholder?: string;
    sizeFromPlaceholder?: boolean;
    size?: number;
    prefix?: string;
    postfix?: string;
    toPublicValue?: (value: string) => string;
    toInternalValue?: (value: string) => string;
}
