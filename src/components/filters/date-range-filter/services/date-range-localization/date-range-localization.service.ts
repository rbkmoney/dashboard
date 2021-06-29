import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { TranslocoService } from '@ngneat/transloco';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getLocalizedDateRange } from './utils/get-localized-date-range';

@Injectable()
export class DateRangeLocalizationService {
    private translations$ = this.transloco.selectTranslateObject('parts', null, 'date-range-filter');

    constructor(@Inject(LOCALE_ID) private locale: string, private transloco: TranslocoService) {}

    getLocalizedString(dateRange: DateRange<Moment>): Observable<string> {
        return this.translations$.pipe(map((t) => getLocalizedDateRange(dateRange, t, this.locale)));
    }
}
