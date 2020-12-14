import { InjectionToken } from '@angular/core';

export const DEBOUNCE_ACTION_TIME = new InjectionToken<number>('debounceActionTime');
export const DEFAULT_DEBOUNCE_ACTION_TIME = 300;
