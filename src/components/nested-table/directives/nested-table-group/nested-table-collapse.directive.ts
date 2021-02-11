import { Directive, Input } from '@angular/core';
import { BehaviorSubject, defer } from 'rxjs';

@Directive({
    selector: '[dshNestedTableCollapse]',
})
export class NestedTableCollapseDirective {
    @Input() set dshNestedTableCollapse(expanded: boolean) {
        this._expanded$.next(expanded);
    }

    expanded$ = defer(() => this._expanded$.asObservable());

    private _expanded$ = new BehaviorSubject(false);

    toggle() {
        this._expanded$.next(!this._expanded$.value);
    }
}
