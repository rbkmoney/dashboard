import { ContentChildren, QueryList, AfterContentInit, Component } from '@angular/core';
import { startWith, filter, mapTo } from 'rxjs/operators';
import { Subscription, merge } from 'rxjs';

import { PayoutPanelComponent } from './payout-panel.component';

@Component({
    selector: 'dsh-payout-panel-accordion',
    template: `
        <ng-content></ng-content>
    `
})
export class PayoutPanelAccordionComponent implements AfterContentInit {
    @ContentChildren(PayoutPanelComponent, { descendants: true })
    payoutPanels: QueryList<PayoutPanelComponent>;

    subs: Subscription = Subscription.EMPTY;

    ngAfterContentInit() {
        this.payoutPanels.changes
            .pipe(startWith(this.payoutPanels))
            .subscribe((payoutPanels: QueryList<PayoutPanelComponent>) => {
                this.subs.unsubscribe();
                this.subs = merge(
                    ...payoutPanels.map(({ expandPanel }, idx) =>
                        expandPanel.expandedChange.pipe(
                            filter(e => e),
                            mapTo(idx)
                        )
                    )
                ).subscribe(idx => this.expand(idx));
            });
    }

    expand(idx: number) {
        this.payoutPanels
            .map(({ expandPanel }) => expandPanel)
            .filter((_, i) => i !== idx)
            .forEach(p => p.collapse());
    }
}
