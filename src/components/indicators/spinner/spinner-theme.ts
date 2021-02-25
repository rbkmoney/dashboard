import { InjectionToken } from '@angular/core';

export type SpinnerThemeProvider = {
    color: string;
};
export const SPINNER_THEME = new InjectionToken<SpinnerThemeProvider>('Spinner theme');
