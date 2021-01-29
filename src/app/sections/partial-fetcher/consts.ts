import { InjectionToken } from '@angular/core';

export const DEBOUNCE_FETCHER_ACTION_TIME = new InjectionToken<number>('debounceFetcherActionTime');
export const DEFAULT_FETCHER_DEBOUNCE_ACTION_TIME = 300;
