import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Daterange } from './daterange';
import { DaterangeService } from './daterange.service';

@Pipe({ name: 'daterange' })
export class DaterangePipe implements PipeTransform {
    private daterange$ = new BehaviorSubject<Partial<Daterange>>({});
    private result = '';

    constructor(daterangeService: DaterangeService) {
        this.daterange$
            .pipe(switchMap((daterange) => daterangeService.switchToDaterangeStr(daterange)))
            .subscribe((r) => (this.result = r));
    }

    transform(daterange: Partial<Daterange>): string {
        this.daterange$.next(daterange || {});
        return this.result;
    }
}
