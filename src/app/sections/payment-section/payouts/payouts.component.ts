import {
    Component,
    ChangeDetectionStrategy,
    ViewChildren,
    QueryList,
    ViewContainerRef,
    AfterViewInit
} from '@angular/core';
import { shareReplay, map, filter, first, delay, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import isNil from 'lodash.isnil';

import { PayoutsService } from './payouts.service';
import { mapToTimestamp } from '../operations/operators';
import { SHARE_REPLAY_CONF } from '../../../custom-operators';
import { PayoutPanelComponent } from './payout-panel';
import { smoothChangeTo } from '../../../../utils';

@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    styleUrls: ['payouts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PayoutsService]
})
export class PayoutsComponent implements AfterViewInit {
    payouts$ = this.payoutsService.searchResult$;
    isLoading$ = this.payoutsService.doAction$;
    isInit$ = this.payoutsService.isInit$;
    hasMore$ = this.payoutsService.hasMore$;
    lastUpdated$ = this.payoutsService.searchResult$.pipe(
        mapToTimestamp,
        shareReplay(SHARE_REPLAY_CONF)
    );

    @ViewChildren(PayoutPanelComponent, { read: ViewContainerRef })
    payoutPanelsRefs: QueryList<ViewContainerRef>;

    @ViewChildren(PayoutPanelComponent)
    payoutPanels: QueryList<PayoutPanelComponent>;

    constructor(private payoutsService: PayoutsService, private route: ActivatedRoute, private router: Router) {}

    ngAfterViewInit() {
        combineLatest(this.payoutsService.selectedIdx$, this.payoutPanelsRefs.changes, this.payoutPanels.changes)
            .pipe(
                map(([selectedIdx]) => ({
                    ref: this.payoutPanelsRefs.toArray()[selectedIdx],
                    component: this.payoutPanels.toArray()[selectedIdx]
                })),
                filter(({ ref, component }) => !!ref && !!component),
                first(),
                delay(350),
                switchMap(panel =>
                    combineLatest(
                        smoothChangeTo(window.pageYOffset, panel.ref.element.nativeElement.offsetTop - 20, 500),
                        of(panel)
                    )
                ),
                map(([scrollY, { component }]) => ({ scrollY, component }))
            )
            .subscribe(({ scrollY, component }) => this.scrollTo(component, scrollY));
    }

    scrollTo({ expandPanel, payout: { id } }: PayoutPanelComponent, scrollTo: number) {
        window.scroll(0, scrollTo);
        if (!expandPanel.expanded) {
            expandPanel.expand();
        }
        this.select(id);
    }

    select(id: string = '') {
        this.router.navigate([], { fragment: id, queryParams: this.route.snapshot.queryParams });
    }

    expand(idx: number) {
        if (isNil(idx)) {
            this.select();
        }
    }

    fetchMore() {
        this.payoutsService.fetchMore();
    }

    refresh() {
        this.payoutsService.refresh();
    }

    scrollToSelected() {
        this.payoutsService.selectedIdx$.subscribe();
    }
}
