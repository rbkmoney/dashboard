import { Injectable } from '@angular/core';
import { BehaviorSubject, defer } from 'rxjs';

@Injectable()
export class ExpansionService {
    expanded$ = defer(() => this._expanded$.asObservable());

    private _expanded$ = new BehaviorSubject(false);

    toggle() {
        this.setExpanded(!this._expanded$.value);
    }

    setExpanded(expanded: boolean) {
        this._expanded$.next(expanded);
    }
}
