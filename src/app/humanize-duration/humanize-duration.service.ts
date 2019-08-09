import { Injectable } from '@angular/core';
import * as humanizeDuration from 'humanize-duration';
import moment from 'moment';

import { LanguageService } from '../locale/language';

export type Value = number | string | moment.Moment | Date;

@Injectable()
export class HumanizeDurationService {
    static HOUR_MS = 3600000;
    static MIN_HUMINIZE_DURATION_UPDATE_MS = 1000;
    static MOMENT_HUMINIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_MINUTE_UPDATES_MS = 20000;
    static MOMENT_HUMINIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_HOURLY_AND_LONGER_UPDATES_MS = 600000;

    private get duration() {
        return humanizeDuration.humanizer({
            language: this.languageService.active,
            round: true,
            delimiter: ' '
        });
    }

    constructor(private languageService: LanguageService) {}

    getDiffMs(value: Value): number {
        return Math.abs(this.isDiff(value) ? value : moment().diff(moment(value)));
    }

    getDuration(value: Value, config: humanizeDuration.HumanizerOptions = {}): string {
        const diffMs = this.getDiffMs(value);
        if (isNaN(diffMs)) {
            return null;
        } else if (config.largest === 1) {
            return moment.duration(diffMs).humanize();
        }
        return this.duration(diffMs, config);
    }

    getOptimalUpdateInterval(value: Value, { largest }: humanizeDuration.HumanizerOptions): number {
        if (largest === 1) {
            const diffMs = this.getDiffMs(value);
            if (diffMs < HumanizeDurationService.HOUR_MS) {
                return HumanizeDurationService.MOMENT_HUMINIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_MINUTE_UPDATES_MS;
            }
            return HumanizeDurationService.MOMENT_HUMINIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_HOURLY_AND_LONGER_UPDATES_MS;
        }
        return HumanizeDurationService.MIN_HUMINIZE_DURATION_UPDATE_MS;
    }

    isDiff(value: Value): value is number {
        return typeof value === 'number';
    }
}
