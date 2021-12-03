import { InjectionToken } from '@angular/core';

import { environment } from './environment';

export type Env = typeof environment;
export const ENV = new InjectionToken<Env>('Env');
export { environment };
