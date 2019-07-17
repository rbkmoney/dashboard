import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import template from 'lodash.template';

import { LocaleDictionaryService } from '../../locale/locale-dictionary';

@Pipe({
    name: 'holdTime'
})
export class HoldTimePipe implements PipeTransform {
    private times = 'sections.paymentDetails.holdDetails.times';
    private timeUpdateInterval = 1000;

    constructor(private localeDictionaryService: LocaleDictionaryService) {}

    transform(date: string): Observable<string> {
        return timer(0, this.timeUpdateInterval).pipe(
            map(() =>
                template(this.localeDictionaryService.mapDictionaryKey('sections.paymentDetails.holdDetails.holdTime'))(
                    {
                        holdUntil: moment(date).format('D MMMM YYYY, HH:mm'),
                        timeUntilHold: this.getTimeUntilDate(date)
                    }
                )
            )
        );
    }

    private getTimeUntilDate(date: string, now = moment()): string {
        const seconds = moment(date).diff(now, 'seconds');
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return `${this.getDaysUntilDate(days)}
                ${this.getHoursUntilDate(hours)}
                ${this.getMinutesUntilDate(minutes)}
                ${this.getSecondsUntilDate(seconds)}`;
    }

    private getDaysUntilDate = (days: number): string =>
        `${days} ${this.localeDictionaryService.mapDictionaryKey(this.times + '.days')}`;

    private getHoursUntilDate = (hours: number): string =>
        `${hours % 24} ${this.localeDictionaryService.mapDictionaryKey(this.times + '.hours')}`;

    private getMinutesUntilDate = (minutes: number): string =>
        `${(minutes % (24 * 60)) % 60} ${this.localeDictionaryService.mapDictionaryKey(this.times + '.minutes')}`;

    private getSecondsUntilDate = (seconds: number): string =>
        `${((seconds % (24 * 60 * 60)) % (60 * 60)) % 60} ${this.localeDictionaryService.mapDictionaryKey(
            this.times + '.seconds'
        )}`;
}
