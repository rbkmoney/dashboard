import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { ReportsService } from '../../../../api';

@Injectable()
export class CreateReportDialogService {
    private create$: Subject<any> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();
    private created$ = new Subject();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();
    reportCreated$ = this.created$.asObservable();

    constructor(private reportsService: ReportsService) {
        this.create$
            .pipe(
                tap(() => this.loading$.next(true)),
                map(({ fromTime, toTime, shopID }) => ({
                    fromTime: moment(fromTime).startOf('day').utc().format(),
                    toTime: moment(toTime).endOf('day').utc().format(),
                    shopID: shopID || undefined,
                })),
                switchMap((req) =>
                    this.reportsService.createReport(req).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => {
                this.loading$.next(false);
                this.created$.next();
            });
    }

    create(formValue: any) {
        this.create$.next(formValue);
    }
}
