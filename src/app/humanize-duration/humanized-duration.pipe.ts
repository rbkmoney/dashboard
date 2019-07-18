import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { HumanizerOptions } from 'humanize-duration';

import { HumanizeDurationService, Value } from './humanize-duration.service';

@Pipe({ name: 'humanizedDuration', pure: false })
export class HumanizedDurationPipe implements OnDestroy, PipeTransform {
    private latestValue: string;
    private subscription: Subscription;
    private inputValue: Value;

    constructor(private humanizeDurationService: HumanizeDurationService, private ref: ChangeDetectorRef) {}

    transform(value: Value, config: HumanizerOptions = {}) {
        if (value !== this.inputValue) {
            if (typeof value === 'object') {
                this.dispose();
                this.inputValue = value;
                this.subscription = interval(1000).subscribe(() => {
                    this.ref.markForCheck();
                    this.updateLatestValue(value, config);
                });
            }
            this.updateLatestValue(value, config);
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

    private updateLatestValue(value: Value, config: HumanizerOptions = {}) {
        this.latestValue = this.humanizeDurationService.getDuration(value, config);
    }
}
