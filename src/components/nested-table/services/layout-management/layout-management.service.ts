import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, defer, Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '@dsh/operators';

@Injectable()
export class LayoutManagementService {
    layoutColsCount$ = defer(() => this._layoutColsCount$.asObservable());
    gridTemplateColumns$ = defer(() => this.rowsGridTemplateColumns$).pipe(
        switchMap((gridTemplateColumns) =>
            gridTemplateColumns
                ? of(gridTemplateColumns)
                : this.layoutColsCount$.pipe(
                      map((colsCount) => LayoutManagementService.getDefaultGridTemplateColumns(colsCount))
                  )
        ),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private _layoutColsCount$ = new ReplaySubject<number>(1);
    private rowsGridTemplateColumns$ = new BehaviorSubject<string>(null);

    private static getDefaultGridTemplateColumns(colsCount: number) {
        return new Array(colsCount).fill('1fr').join(' ');
    }

    getFillCols(colsCount$: Observable<number>): Observable<string[]> {
        return combineLatest([this.layoutColsCount$, colsCount$]).pipe(
            map(([baseCount, count]) => Math.max(baseCount - count, 0)),
            distinctUntilChanged(),
            map((count) => new Array(count).fill(''))
        );
    }

    setRowsGridTemplateColumns(rowsGridTemplateColumns: string) {
        this.rowsGridTemplateColumns$.next(rowsGridTemplateColumns);
    }

    setLayoutColsCount(colsCount: number) {
        this._layoutColsCount$.next(colsCount);
    }
}
