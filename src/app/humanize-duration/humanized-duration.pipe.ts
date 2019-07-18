import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription, interval } from 'rxjs';

import { HumanizeDurationService } from './humanize-duration.service';

type Value = number | moment.Moment;

@Pipe({ name: 'humanizedDuration', pure: false })
export class HumanizedDurationPipe implements OnDestroy, PipeTransform {
    private latestValue: string;
    private subscription: Subscription;
    private inputValue: Value;

    constructor(private humanizeDurationService: HumanizeDurationService, private ref: ChangeDetectorRef) {}

    transform(value: Value) {
        if (value !== this.inputValue) {
            if (typeof value === 'object') {
                this.dispose();
                this.inputValue = value;
                this.subscription = interval(1000).subscribe(() => {
                    this.ref.markForCheck();
                    this.updateLatestValue(value);
                });
            }
            this.updateLatestValue(value);
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

    private updateLatestValue(value: Value) {
        this.latestValue = this.humanizeDurationService.getDuration(value);
    }
}
