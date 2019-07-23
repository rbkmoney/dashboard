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

    transform(value: Value, { interval: intervalMs, ...config }: HumanizeDurationConfig = {}) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            if (typeof value !== 'number') {
                this.dispose();
                this.subscription = interval(intervalMs || 1000).subscribe(() => this.updateValue(value, config));
            }
            this.latestValue = this.humanizeDurationService.getDuration(value, config);
        }
        return this.latestValue;
    }

    ngOnDestroy(): void {
        this.dispose();
    }

    private dispose(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private updateValue(value: Value, config: HumanizerOptions = {}) {
        const duration = this.humanizeDurationService.getDuration(value, config);
        if (duration !== this.latestValue) {
            this.ref.markForCheck();
            this.latestValue = duration;
        }
    }
}
