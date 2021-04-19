import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as humanizeDuration from 'humanize-duration';
import moment from 'moment';

import { Language, LanguageService } from '../language';

export type Value = number | string | moment.Moment | Date;

export interface HumanizeConfig extends humanizeDuration.HumanizerOptions {
    isShort?: boolean;
    hasAgoEnding?: boolean;
}

@Injectable()
export class HumanizeDurationService {
    static HOUR_MS = 3600000;
    static MIN_HUMANIZE_DURATION_UPDATE_MS = 1000;
    static MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_MINUTE_UPDATES_MS = 20000;
    static MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_HOURLY_AND_LONGER_UPDATES_MS = 600000;
    static LESS_THAN_FEW_SECONDS = 3000;

    private get duration() {
        return humanizeDuration.humanizer({
            language: this.languageService.active || Language.En,
            round: true,
            delimiter: ' ',
        });
    }

    get shortEnglishHumanizer(): humanizeDuration.HumanizerOptions {
        const getLocalizedUnitFn = (unit: string) => () => this.transloco.translate(`shortTimeUnits.${unit}`);
        return {
            language: 'short',
            languages: {
                short: {
                    y: getLocalizedUnitFn('year'),
                    mo: getLocalizedUnitFn('month'),
                    w: getLocalizedUnitFn('week'),
                    d: getLocalizedUnitFn('day'),
                    h: getLocalizedUnitFn('hour'),
                    m: getLocalizedUnitFn('minute'),
                    s: getLocalizedUnitFn('second'),
                    ms: getLocalizedUnitFn('millisecond'),
                },
            },
        };
    }

    constructor(private languageService: LanguageService, private transloco: TranslocoService) {}

    getDiffMs(value: Value): number {
        return Math.abs(this.isDiff(value) ? value : moment().diff(moment(value)));
    }

    getDuration(value: Value, config: HumanizeConfig = {}): string {
        const diffMs = this.getDiffMs(value);
        let duration = this.duration(diffMs, config);
        if (isNaN(diffMs)) {
            return null;
        } else if (diffMs < HumanizeDurationService.LESS_THAN_FEW_SECONDS) {
            return this.transloco.translate('justNow');
        } else if (config.isShort) {
            duration = this.duration(diffMs, { ...config, ...this.shortEnglishHumanizer });
        } else if (config.largest === 1) {
            duration = moment.duration(diffMs).humanize();
        }
        duration = duration === 'минута' ? 'минуту' : duration;
        return config.hasAgoEnding ? `${duration} ${this.transloco.translate('ago')}` : duration;
    }

    getOptimalUpdateInterval(value: Value, { largest }: HumanizeConfig): number {
        const diffMs = this.getDiffMs(value);
        if (diffMs < HumanizeDurationService.LESS_THAN_FEW_SECONDS) {
            return HumanizeDurationService.MIN_HUMANIZE_DURATION_UPDATE_MS;
        }
        if (largest === 1) {
            if (diffMs < HumanizeDurationService.HOUR_MS) {
                return HumanizeDurationService.MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_MINUTE_UPDATES_MS;
            }
            return HumanizeDurationService.MOMENT_HUMANIZE_ALLOWED_DELAY_BETWEEN_UPDATES_FOR_HOURLY_AND_LONGER_UPDATES_MS;
        }
        return HumanizeDurationService.MIN_HUMANIZE_DURATION_UPDATE_MS;
    }

    isDiff(value: Value): value is number {
        return typeof value === 'number';
    }
}
