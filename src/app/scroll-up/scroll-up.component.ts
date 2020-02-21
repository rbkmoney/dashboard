import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { easeInOutCubic } from './ease-in-out-cubic';

@Component({
    selector: 'dsh-scroll-up',
    templateUrl: 'scroll-up.component.html',
    styleUrls: ['scroll-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollUpComponent {
    scrollToTop() {
        const timeMs = 500;
        const intervalMs = 16; // 16 = ~60 FPS
        const count = Math.round(timeMs / intervalMs);
        const startPos = window.pageYOffset;
        interval(intervalMs)
            .pipe(
                map(i => count - 1 - i),
                takeWhile(i => i >= 0)
            )
            .subscribe(i => {
                const current = easeInOutCubic((1 / count) * i) * startPos;
                window.scrollTo(0, current);
            });
    }
}
