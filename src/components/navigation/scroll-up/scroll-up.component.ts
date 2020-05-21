import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { smoothChangeTo } from '../../../utils';
import { hideAnimation } from './hide-animation';

const RIGHT_OFFSET = 30;
const BOTTOM_OFFSET = 50;
const MIN_OFFSET = 10;
const SIZE = 36;

@Component({
    selector: 'dsh-scroll-up',
    templateUrl: 'scroll-up.component.html',
    styleUrls: ['scroll-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [hideAnimation],
})
export class ScrollUpComponent implements OnInit, OnDestroy {
    /**
     * Auto-scrolling time, ms
     */
    @Input()
    scrollTime = 500;

    /**
     * Hide after scrolling below, px
     */
    @Input()
    hideAfter = 500;

    /**
     * Displayed content width, px
     */
    @Input()
    contentWidth = 920;

    isShow$ = new BehaviorSubject(false);

    rightOffset$ = new BehaviorSubject(RIGHT_OFFSET);
    readonly bottomOffset = BOTTOM_OFFSET;

    ngOnInit() {
        this.setIsShow();
        window.addEventListener('scroll', this.setIsShow);
        window.addEventListener('resize', this.setIsShow);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.setIsShow);
        window.addEventListener('resize', this.setIsShow);
    }

    scrollToTop() {
        smoothChangeTo(window.pageYOffset, 0, this.scrollTime).subscribe((v) => window.scrollTo(0, v));
    }

    private changeIsShow(isShow: boolean) {
        if (this.isShow$.value !== isShow) {
            this.isShow$.next(isShow);
        }
    }

    private setIsShow = () => {
        const isShowByYOffset = window.pageYOffset >= this.hideAfter;
        if (!isShowByYOffset) {
            return this.changeIsShow(false);
        }
        const width = document.documentElement.clientWidth;
        const minRequiredWidth = this.contentWidth + (MIN_OFFSET * 2 + SIZE) * 2;
        const isShowByWidth = width >= minRequiredWidth;
        if (!isShowByWidth) {
            return this.changeIsShow(false);
        }
        const remaining = Math.min((width - minRequiredWidth) / 2, RIGHT_OFFSET - MIN_OFFSET);
        const nextOffset = MIN_OFFSET + remaining;
        if (this.rightOffset$.value !== nextOffset) {
            this.rightOffset$.next(nextOffset);
        }
        this.changeIsShow(true);
    };
}
