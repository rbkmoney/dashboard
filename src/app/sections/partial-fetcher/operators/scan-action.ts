import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export const scanAction = <T>(s: Observable<T>) =>
    s.pipe(scan<T, T>((lastAction, currentAction) => ({ ...lastAction, ...currentAction }), null));
