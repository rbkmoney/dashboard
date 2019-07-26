import { Injectable } from '@angular/core';
import * as humanizeDuration from 'humanize-duration';
import moment from 'moment';

import { SettingsService } from '../settings';

export type Value = number | string | moment.Moment | Date;

@Injectable()
export class HumanizeDurationService {
    private get duration() {
        return humanizeDuration.humanizer({
            language: this.settinsService.language,
            round: true,
            delimiter: ' '
        });
    }

    constructor(private settinsService: SettingsService) {}

    getDuration(value: Value, config: humanizeDuration.HumanizerOptions = {}): string {
        const diffMs = typeof value === 'number' ? value : moment().diff(moment(value));
        if (isNaN(diffMs)) {
            return null;
        }
        if (config.largest === 1) {
            return moment.duration(diffMs).humanize();
        }
        return this.duration(diffMs, config);
    }
}
