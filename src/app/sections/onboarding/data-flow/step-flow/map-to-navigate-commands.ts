import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StepName } from './step-name';

const toBaseUrl = (url: string, nesting = 3): string[] => url.split('/').splice(0, nesting);

export const mapToNavigateCommands = (url: string) => (s: Observable<StepName>): Observable<string[]> =>
    s.pipe(map(step => [...toBaseUrl(url), step]));
