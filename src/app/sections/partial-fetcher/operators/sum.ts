import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export const sum = <T>(s: Observable<T>) => s.pipe(scan(count => ++count, 0));
