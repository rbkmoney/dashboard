import { InjectionToken } from '@angular/core';

import { Serializer } from '@dsh/app/shared/services/query-params/types/serializer';

export const QUERY_PARAMS_SERIALIZERS = new InjectionToken<Serializer[]>('query params serializers');
