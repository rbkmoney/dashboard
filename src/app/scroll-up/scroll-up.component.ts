import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { easeInOutCubic } from './ease-in-out-cubic';

@Component({
    selector: 'dsh-scroll-up',
    templateUrl: 'scroll-up.component.html',
    styleUrls: ['scroll-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollUpComponent implements OnInit, OnDestroy {
    @Input()
    scrollTime = 500;

    /**
     * 16 = ~60 FPS
     */
    @Input()
    interval = 16;

    isShow$ = new BehaviorSubject(false);

    ngOnInit() {
        this.updateShowing();
        window.addEventListener('scroll', this.updateShowing);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.updateShowing);
    }

    scrollToTop() {
        const count = Math.ceil(this.scrollTime / this.interval);
        const startPos = window.pageYOffset;
        interval(this.interval)
            .pipe(
                map(i => count - 1 - i),
                takeWhile(i => i >= 0)
            )
            .subscribe(i => {
                const current = easeInOutCubic((1 / count) * i) * startPos;
                window.scrollTo(0, current);
            });
    }

    updateShowing = () => {
        if (window.pageYOffset === 0) {
            if (this.isShow$.value !== false) {
                this.isShow$.next(false);
            }
        } else {
            if (this.isShow$.value !== true) {
                this.isShow$.next(true);
            }
        }
    };
}
