import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

export abstract class QueryParamsStore<D> {
    data$: Observable<D> = this.route.queryParams.pipe(
        take(1),
        map((p) => this.mapToData(p)),
        shareReplay(1)
    );

    constructor(protected router: Router, protected route: ActivatedRoute) {
        this.route.queryParams.subscribe((p) => console.log('on queryParams', p));
    }

    abstract mapToData(queryParams: Params): D;

    abstract mapToParams(data: D): Params;

    preserve(data: D) {
        this.router.navigate([], { queryParams: this.mapToParams(data), preserveFragment: true });
    }
}
