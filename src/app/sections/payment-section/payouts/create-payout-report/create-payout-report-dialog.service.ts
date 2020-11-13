import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { ReportsService } from '../../../../api';
import { Payout } from '../../../../api-codegen/anapi';
import { CreateReportReq } from '../../../../api/reports/create-reports';

const daterangeReducer = (_, { fromTime, toTime }) =>
    ({
        fromTime,
        toTime: moment(toTime).add(1, 'ms').utc().format('YYYY-MM-DDTHH:mm:ss.SSSS[Z]'),
    } as any);
export const toCreateReportParams = ({ shopID, payoutSummary }: Payout): CreateReportReq => ({
    ...payoutSummary.reduce(daterangeReducer, null),
    shopID,
});

@Injectable()
export class CreatePayoutReportDialogService {
    private create$: Subject<Payout> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private created$ = new BehaviorSubject(false);
    private error$ = new Subject();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();
    reportCreated$ = this.created$.asObservable();

    constructor(private reportsService: ReportsService) {
        this.create$
            .pipe(
                tap(() => {
                    this.loading$.next(true);
                    this.created$.next(false);
                }),
                map(toCreateReportParams),
                switchMap((params) =>
                    this.reportsService.createReport(params).pipe(
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
                this.created$.next(true);
            });
    }

    create(payout: Payout) {
        this.create$.next(payout);
    }
}
