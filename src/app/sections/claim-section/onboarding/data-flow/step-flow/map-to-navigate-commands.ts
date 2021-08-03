import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { toBaseUrl } from '../to-base-url';
import { StepName } from './step-name';

export const mapToNavigateCommands =
    (url: string) =>
    (s: Observable<StepName>): Observable<string[]> =>
        s.pipe(map((step) => [...toBaseUrl(url), step]));
