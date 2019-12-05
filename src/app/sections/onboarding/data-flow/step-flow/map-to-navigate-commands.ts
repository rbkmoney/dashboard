import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StepName } from './step-name';
import { toBaseUrl } from '../to-base-url';

export const mapToNavigateCommands = (url: string) => (s: Observable<StepName>): Observable<string[]> =>
    s.pipe(map(step => [...toBaseUrl(url), step]));
