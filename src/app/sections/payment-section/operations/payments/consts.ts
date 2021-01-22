import { InjectionToken } from '@angular/core';

export const PAYMENTS_UPDATE_DELAY_TOKEN = new InjectionToken<number>('payments-update-delay-token');
export const DEFAULT_PAYMENTS_UPDATE_DELAY = 300;
