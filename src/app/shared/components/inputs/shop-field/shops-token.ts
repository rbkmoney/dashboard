import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Shop } from '@dsh/api-codegen/capi';

export const SHOPS = new InjectionToken<Observable<Shop[]>>('Shops');
