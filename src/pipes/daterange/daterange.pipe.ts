import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Daterange } from './daterange';
import { DaterangeService } from './daterange.service';

@Pipe({ name: 'daterange', pure: false })
export class DaterangePipe implements PipeTransform {
    private daterange$ = new BehaviorSubject<Partial<Daterange>>({});
    private result = '';

    constructor(daterangeService: DaterangeService, private ref: ChangeDetectorRef) {
        this.daterange$
            .pipe(
                switchMap((daterange) => daterangeService.switchToDaterangeStr(daterange)),
                distinctUntilChanged()
            )
            .subscribe((r) => {
                this.result = r;
                this.ref.markForCheck();
            });
    }

    transform(daterange: Partial<Daterange>): string {
        this.daterange$.next(daterange);
        return this.result;
    }
}
