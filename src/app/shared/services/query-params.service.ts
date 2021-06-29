import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, publishReplay, refCount, startWith } from 'rxjs/operators';

function swapQuotes(str: string) {
    return str.replace(/['"]/g, (m) => (m === '"' ? "'" : '"'));
}

@UntilDestroy()
@Injectable()
export class QueryParamsService<Params> {
    params$: Observable<Params> = this.route.queryParams.pipe(
        startWith(this.route.snapshot.queryParams),
        map((params) =>
            Object.entries(params).reduce((acc, [k, v]) => {
                acc[k] = JSON.parse(swapQuotes(v || ''));
                return acc;
            }, {} as Params)
        ),
        distinctUntilChanged(isEqual),
        publishReplay(1),
        refCount()
    );

    constructor(private router: Router, private route: ActivatedRoute) {}

    async set(params: Params): Promise<boolean> {
        return await this.router.navigate([], {
            queryParams: Object.entries(params).reduce((acc, [k, v]) => {
                acc[k] = swapQuotes(JSON.stringify(v));
                return acc;
            }, {} as unknown),
        });
    }
}
