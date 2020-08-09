import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { multipleDownload } from '../../../../../utils';
import { ReportsService } from '../../../../api';

@Injectable()
export class ReportFilesService {
    private download$: Subject<{ reportID: number; fileIDs: string[] }> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();

    constructor(private reportsApiService: ReportsService) {
        this.download$
            .pipe(
                tap(() => {
                    this.loading$.next(true);
                }),
                switchMap(({ reportID, fileIDs }) =>
                    forkJoin(fileIDs.map((fileID) => this.reportsApiService.downloadFile(reportID, fileID)))
                ),
                map((links) => links.map((link) => link.url)),
                catchError((err) => {
                    console.error(err);
                    this.error$.next();
                    return of([]);
                })
            )
            .subscribe((urls: string[]) => {
                this.loading$.next(false);
                multipleDownload(urls);
            });
    }

    download(reportID: number, fileIDs: string[]) {
        this.download$.next({ reportID, fileIDs });
    }
}
