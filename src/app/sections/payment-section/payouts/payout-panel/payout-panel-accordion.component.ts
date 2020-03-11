import { ContentChildren, QueryList, AfterContentInit, Component, Output, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
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

    @Output()
    expanded = new EventEmitter<number>(null);

    subs: Subscription = Subscription.EMPTY;

    ngAfterContentInit() {
        this.payoutPanels.changes
            .pipe(startWith(this.payoutPanels))
            .subscribe((payoutPanels: QueryList<PayoutPanelComponent>) => {
                this.subs.unsubscribe();
                this.subs = merge(
                    ...payoutPanels.map(({ expandPanel }, idx) =>
                        expandPanel.expandedChange.pipe(map(e => (e ? idx : null)))
                    )
                ).subscribe(idx => this.expand(idx));
            });
    }

    expand(idx: number) {
        if (idx !== null) {
            this.payoutPanels
                .map(({ expandPanel }) => expandPanel)
                .filter((_, i) => i !== idx)
                .forEach(p => p.collapse());
        }
        this.expanded.emit(idx);
    }
}
