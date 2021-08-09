import { InjectionToken } from '@angular/core';

export interface AutocompleteFieldOptions {
    svgIcon?: string;
}

export const AUTOCOMPLETE_FIELD_OPTIONS: InjectionToken<AutocompleteFieldOptions> = new InjectionToken(
    'AutocompleteFieldOptions'
);
