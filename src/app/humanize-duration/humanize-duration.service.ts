import { Injectable } from '@angular/core';
import * as humanizeDurationz from 'humanize-duration';
import moment from 'moment';

import { SettingsService } from '../settings';

@Injectable()
export class HumanizeDurationService {
    get duration() {
        return humanizeDurationz.humanizer({
            language: this.settinsService.language,
            round: true,
            delimiter: ' '
        });
    }

    constructor(private settinsService: SettingsService) {}

    getDuration(value: number | moment.Moment) {
        let diff;
        switch (typeof value) {
            case 'string':
            case 'number':
                diff = Number(value);
                break;
            default:
                diff = moment().diff(value);
                break;
        }
        return this.duration(diff);
    }
}
