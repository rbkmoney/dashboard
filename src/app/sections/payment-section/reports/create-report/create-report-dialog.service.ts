import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { ReportsService } from '@dsh/api/reports';

import { formValueToCreateValue } from './form-value-to-create-value';

@Injectable()
export class CreateReportDialogService {
    private create$: Subject<any> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();
    private created$ = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.loading$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorOccurred$ = this.error$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    reportCreated$ = this.created$.asObservable();

    constructor(private reportsService: ReportsService) {
        this.create$
            .pipe(
                tap(() => this.loading$.next(true)),
                map(formValueToCreateValue),
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
