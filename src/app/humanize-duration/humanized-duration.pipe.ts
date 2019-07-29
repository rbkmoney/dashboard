import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { HumanizerOptions } from 'humanize-duration';

import { HumanizeDurationService, Value } from './humanize-duration.service';

export interface HumanizeDurationConfig {
    interval?: number;
    largest?: number;
}

@Pipe({ name: 'humanizedDuration', pure: false })
export class HumanizedDurationPipe implements OnDestroy, PipeTransform {
    private latestValue: string;
    private subscription: Subscription;
    private inputValue: Value;

    constructor(private humanizeDurationService: HumanizeDurationService, private ref: ChangeDetectorRef) {}

    transform(value: Value, { interval: inpIntervalMs, ...config }: HumanizeDurationConfig = {}) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            this.latestValue = this.humanizeDurationService.getDuration(value, config);
            if (typeof value !== 'number') {
                this.dispose();
                const intervalMs = inpIntervalMs || this.getInterval(value, config);
                this.subscription = interval(intervalMs).subscribe(() => this.updateValue(value, config));
            }
        }
        return this.latestValue;
    }

    ngOnDestroy(): void {
        this.dispose();
    }

    private getInterval(value: Value, { largest }: HumanizerOptions): number {
        if (largest === 1) {
            const diffMs = this.humanizeDurationService.getDiffMs(value);
            if (diffMs < 3600000) {
                return 20000;
            }
            return 600000;
        }
        return 1000;
    }

    private dispose(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private updateValue(value: Value, config: HumanizerOptions) {
        const duration = this.humanizeDurationService.getDuration(value, config);
        if (duration !== this.latestValue) {
            this.ref.markForCheck();
            this.latestValue = duration;
        }
    }
}
