import { QueryList, ViewContainerRef } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { delay, filter, first, map, switchMap } from 'rxjs/operators';

import { smoothChangeTo } from '../../../../utils';
import { PayoutPanelComponent } from './payout-panel';

export function autoscrollTo({
    selectedIdx$,
    payoutPanelsRefs,
    payoutPanels,
    initDelayMs,
    scrollToYOffset,
    scrollTimeMs
}: {
    selectedIdx$: Observable<number>;
    payoutPanelsRefs: QueryList<ViewContainerRef>;
    payoutPanels: QueryList<PayoutPanelComponent>;
    initDelayMs: number;
    scrollToYOffset: number;
    scrollTimeMs: number;
}) {
    return combineLatest([
        selectedIdx$,
        payoutPanelsRefs.changes.pipe(map(() => payoutPanelsRefs.toArray())),
        payoutPanels.changes.pipe(map(() => payoutPanels.toArray()))
    ]).pipe(
        map(([selectedIdx, refs, components]) => ({
            ref: refs[selectedIdx],
            component: components[selectedIdx]
        })),
        filter(({ ref, component }) => !!ref && !!component),
        first(),
        delay(initDelayMs),
        switchMap(({ ref, component }) =>
            combineLatest([
                smoothChangeTo(window.pageYOffset, ref.element.nativeElement.offsetTop - scrollToYOffset, scrollTimeMs),
                of(component)
            ])
        ),
        map(([scrollY, component]) => ({ scrollY, component }))
    );
}
