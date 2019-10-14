import { Injectable } from '@angular/core';
import * as humanizeDuration from 'humanize-duration';
import moment from 'moment';
import { TranslocoService } from '@ngneat/transloco';

import { LanguageService } from '../language';

export type Value = number | string | moment.Moment | Date;

export interface HumanizeConfig extends humanizeDuration.HumanizerOptions {
    isShort?: boolean;
    isAgoSuffixRequired?: boolean;
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
            language: this.languageService.active,
            round: true,
            delimiter: ' '
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
                    ms: getLocalizedUnitFn('millisecond')
                }
            }
        };
    }

    constructor(private languageService: LanguageService, private transloco: TranslocoService) {}

    getDiffMs(value: Value): number {
        return Math.abs(this.isDiff(value) ? value : moment().diff(moment(value)));
    }

    getDuration(value: Value, config: HumanizeConfig = {}): string {
        const diffMs = this.getDiffMs(value);
        if (isNaN(diffMs)) {
            return null;
        } else if (config.isShort) {
            return config.isAgoSuffixRequired
                ? `${this.duration(diffMs, { ...config, ...this.shortEnglishHumanizer })} ${this.transloco.translate(
                      'ago'
                  )}`
                : this.duration(diffMs, { ...config, ...this.shortEnglishHumanizer });
        } else if (config.largest === 1) {
            if (diffMs < HumanizeDurationService.LESS_THAN_FEW_SECONDS) {
                return this.transloco.translate('justNow');
            }

            return config.isAgoSuffixRequired
                ? `${moment.duration(diffMs).humanize()} ${this.transloco.translate('ago')}`
                : moment.duration(diffMs).humanize();
        }
        return config.isAgoSuffixRequired
            ? `${this.duration(diffMs, config)} ${this.transloco.translate('ago')}`
            : this.duration(diffMs, config);
    }

    getOptimalUpdateInterval(value: Value, { largest }: HumanizeConfig): number {
        if (largest === 1) {
            const diffMs = this.getDiffMs(value);
            if (diffMs < HumanizeDurationService.LESS_THAN_FEW_SECONDS) {
                return HumanizeDurationService.MIN_HUMANIZE_DURATION_UPDATE_MS;
            }
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
