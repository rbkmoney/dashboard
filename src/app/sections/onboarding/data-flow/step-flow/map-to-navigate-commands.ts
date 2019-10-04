import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StepName } from './step-name';

const toBaseUrl = (url: string, nesting = 3): string[] => url.split('/').splice(0, nesting);

interface NavigationContext {
    commands: string[];
    step: StepName;
}

export const mapToNavigateCommands = (url: string) => (s: Observable<StepName>): Observable<NavigationContext> =>
    s.pipe(
        map(step => ({
            commands: [...toBaseUrl(url), step],
            step
        }))
    );
