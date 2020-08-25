import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class OtherFiltersService {
    close$ = new Subject<void>();
    save$ = new Subject<void>();
    reset$ = new Subject<void>();

    close() {
        this.close$.next();
    }
}
