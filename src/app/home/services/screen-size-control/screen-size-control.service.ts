import { Injectable, NgZone } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { MOBILE_BREAKPOINT } from './consts';
import { ScreenSize } from './interfaces/screen-size';
import { WindowSize } from './interfaces/window-size';

@UntilDestroy()
@Injectable()
export class ScreenSizeControlService {
    screenSize$: Observable<ScreenSize>;

    private screenWidth$ = new Subject<number>();

    constructor(private zone: NgZone) {}

    init(): void {
        this.screenSize$ = this.screenWidth$.pipe(
            startWith(window.innerWidth),
            map((size: number) => (size > MOBILE_BREAKPOINT ? ScreenSize.LAPTOP : ScreenSize.MOBILE)),
            distinctUntilChanged(),
            shareReplay(1)
        );

        this.zone.runOutsideAngular(() => {
            const windowSizes$ = fromEvent(window, 'resize').pipe(
                map(({ target }: Event) => target as Window),
                map(({ innerHeight: height, innerWidth: width }: Window) => {
                    return {
                        height,
                        width,
                    };
                })
            );

            windowSizes$.pipe(untilDestroyed(this)).subscribe(({ width }: WindowSize) => {
                this.zone.run(() => {
                    this.screenWidth$.next(width);
                });
            });
        });
    }
}
