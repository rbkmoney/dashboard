import { Injectable } from '@angular/core';
import * as humanizeDurationz from 'humanize-duration';
import moment from 'moment';

import { SettingsService } from '../settings';

export type Value = number | moment.Moment;

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

    getDuration(value: Value, config: humanizeDurationz.HumanizerOptions = {}) {
        let diffMs;
        switch (typeof value) {
            case 'string':
            case 'number':
                diffMs = Number(value);
                break;
            default:
                diffMs = moment().diff(value);
                break;
        }
        if (config.largest === 1) {
            return moment.duration(diffMs).humanize();
        }
        return this.duration(diffMs, config);
    }
}
