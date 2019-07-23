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
            if (typeof value === 'object') {
                this.dispose();
                this.inputValue = value;
                this.subscription = interval(intervalMs || 1000).subscribe(() => {
                    this.ref.markForCheck();
                    this.setLatestValue(value, config);
                });
            }
            this.setLatestValue(value, config);
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

    private setLatestValue(value: Value, config: HumanizerOptions = {}) {
        this.latestValue = this.humanizeDurationService.getDuration(value, config);
    }
}
