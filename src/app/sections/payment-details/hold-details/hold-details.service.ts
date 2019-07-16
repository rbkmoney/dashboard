import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

import { LocaleDictionaryService } from '../../../locale/locale-dictionary';

@Injectable()
export class HoldDetailsService {
    localePath = 'sections.paymentDetails.holdDetails';

    private timeUpdateInterval = 1000;

    constructor(private localeDictionaryService: LocaleDictionaryService) {}

    getHoldTimer(holdDate: string): Observable<string> {
        return timer(0, this.timeUpdateInterval).pipe(map(() => this.getUntilHoldTime(holdDate)));
    }

    private getUntilHoldTime(holdDate: string): string {
        const d = moment(holdDate).diff(moment(), 'days');
        const h = moment(holdDate).diff(moment(), 'hours') % 24;
        const m = (moment(holdDate).diff(moment(), 'minutes') - d * 24 * 60) % 60;
        const s = (moment(holdDate).diff(moment(), 'seconds') - d * 24 * 60 * 60) % 60;

        return `${this.getDaysUntilHoldTime(d)} ${this.getHoursUntilHoldTime(h)} ${this.getMinutesUntilHoldTime(m)} ${this.getSecondsUntilHoldTime(s)}`;
    }

    private getDaysUntilHoldTime = (minutes: number) =>
        `${minutes} ${this.localeDictionaryService.mapDictionaryKey(this.localePath + '.times.days')}`;

    private getHoursUntilHoldTime = (minutes: number) =>
        `${minutes} ${this.localeDictionaryService.mapDictionaryKey(this.localePath + '.times.hours')}`;

    private getMinutesUntilHoldTime = (minutes: number) =>
        `${minutes} ${this.localeDictionaryService.mapDictionaryKey(this.localePath + '.times.minutes')}`;

    private getSecondsUntilHoldTime = (minutes: number) =>
        `${minutes} ${this.localeDictionaryService.mapDictionaryKey(this.localePath + '.times.seconds')}`;

}
