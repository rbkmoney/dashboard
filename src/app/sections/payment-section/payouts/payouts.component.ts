import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import isNil from 'lodash.isnil';
import { shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../custom-operators';
import { mapToTimestamp } from '../operations/operators';
import { autoscrollTo } from './autoscroll-to';
import { PayoutPanelComponent } from './payout-panel';
import { PayoutsService } from './payouts.service';

const INIT_DELAY_MS = 350;
const SCROLL_TO_Y_OFFSET_PX = 20;
const SCROLL_TIME_MS = 500;

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
        autoscrollTo({
            selectedIdx$: this.payoutsService.selectedIdx$,
            payoutPanelsRefs: this.payoutPanelsRefs,
            payoutPanels: this.payoutPanels,
            initDelayMs: INIT_DELAY_MS,
            scrollToYOffset: SCROLL_TO_Y_OFFSET_PX,
            scrollTimeMs: SCROLL_TIME_MS
        }).subscribe(({ scrollY, component }) => this.scrollTo(component, scrollY));
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
