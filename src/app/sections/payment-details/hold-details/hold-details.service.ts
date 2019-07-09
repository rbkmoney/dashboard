import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

import { LocaleDictionaryService } from '../../../locale/locale-dictionary';

@Injectable()
export class HoldDetailsService {
    localePath = 'sections.paymentDetails.holdDetails';

    private timeUpdateInterval = 60 * 1000;

    constructor(private localeDictionaryService: LocaleDictionaryService) {}

    getHoldTimer(holdDate: string): Observable<string> {
        return timer(0, this.timeUpdateInterval).pipe(map(() => this.getUntilHoldTime(holdDate)));
    }

    private getUntilHoldTime(holdDate: string): string {
        const d = moment(holdDate).diff(moment(), 'days');
        const h = moment(holdDate).diff(moment(), 'hours') % 24;
        const m = (moment(holdDate).diff(moment(), 'minutes') - d * 24 * 60) % 60;

        return `${this.getDaysUntilHoldTime(d)} ${this.getHoursUntilHoldTime(h)} ${this.getMinutesUntilHoldTime(m)}`;
    }

    private getDaysUntilHoldTime(time: number): string {
        const times = this.localePath + '.times';
        const days = time.toString();
        const lastSymbol = days.toString().charAt(days.length - 1);
        switch (lastSymbol) {
            case '1':
                return `${days} ${this.localeDictionaryService.mapDictionaryKey(times + '.oneDay')}`;
            case '2':
            case '3':
            case '4':
                return `${days} ${this.localeDictionaryService.mapDictionaryKey(times + '.fewDays')}`;
            default:
                return `${days} ${this.localeDictionaryService.mapDictionaryKey(times + '.manyDays')}`;
        }
    }

    private getHoursUntilHoldTime(time: number) {
        const times = this.localePath + '.times';
        const hours = time.toString();
        const lastSymbol = hours.toString().charAt(hours.length - 1);
        switch (lastSymbol) {
            case '1':
                return `${hours} ${this.localeDictionaryService.mapDictionaryKey(times + '.oneHour')}`;
            case '2':
            case '3':
            case '4':
                return `${hours} ${this.localeDictionaryService.mapDictionaryKey(times + '.fewHours')}`;
            default:
                return `${hours} ${this.localeDictionaryService.mapDictionaryKey(times + '.manyHours')}`;
        }
    }

    private getMinutesUntilHoldTime(time: number) {
        const times = this.localePath + '.times';
        const minutes = time.toString();
        const lastSymbol = minutes.toString().charAt(minutes.length - 1);
        switch (lastSymbol) {
            case '1':
                return `${minutes} ${this.localeDictionaryService.mapDictionaryKey(times + '.oneMinute')}`;
            case '2':
            case '3':
            case '4':
                return `${minutes} ${this.localeDictionaryService.mapDictionaryKey(times + '.fewMinutes')}`;
            default:
                return `${minutes} ${this.localeDictionaryService.mapDictionaryKey(times + '.manyMinutes')}`;
        }
    }
}
