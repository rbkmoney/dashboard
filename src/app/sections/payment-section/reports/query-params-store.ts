import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export abstract class QueryParamsStore<D> {
    data$: Observable<D> = this.route.queryParams.pipe(
        take(1),
        map((p) => this.map2Data(p))
    );

    constructor(protected router: Router, protected route: ActivatedRoute) {}

    abstract map2Data(queryParams: Params): D;

    abstract map2Params(data: D): Params;

    preserve(data: D) {
        this.router.navigate([], { queryParams: this.map2Params(data), preserveFragment: true });
    }
}
