import { QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export function queryListArrayChanges<T>(queryList: QueryList<T>): Observable<T[]> {
    return (queryList.changes as Observable<QueryList<T>>).pipe(
        startWith(queryList),
        map((ql) => ql.toArray())
    );
}
