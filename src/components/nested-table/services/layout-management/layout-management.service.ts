import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, defer, Observable, of, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '@dsh/operators';

@Injectable()
export class LayoutManagementService {
    layoutColsCount$ = new ReplaySubject<number>(1);
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

    private rowsGridTemplateColumns$ = new BehaviorSubject<string>(null);

    private static getDefaultGridTemplateColumns(colsCount: number) {
        return new Array(colsCount).fill('1fr').join(' ');
    }

    getFillCols(colsCount$: Observable<number>) {
        return combineLatest([this.layoutColsCount$, colsCount$]).pipe(
            map(([baseCount, count]) => new Array(baseCount - count).fill(null))
        );
    }

    setRowsGridTemplateColumns(rowsGridTemplateColumns: string) {
        this.rowsGridTemplateColumns$.next(rowsGridTemplateColumns);
    }
}
