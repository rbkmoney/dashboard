import {
    AfterViewInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewContainerRef
} from '@angular/core';
import { combineLatest, merge, of, Subscription } from 'rxjs';
import { delay, filter, first, map, mapTo, startWith, switchMap, tap } from 'rxjs/operators';

import { coerce, smoothChangeTo } from '../../../utils';
import { ExpandPanelComponent } from './expand-panel.component';

const INIT_DELAY_MS = 350;
const SCROLL_TO_Y_OFFSET_PX = 20;
const SCROLL_TIME_MS = 500;

@Component({
    selector: 'dsh-expand-panel-accordion',
    template: `
        <ng-content></ng-content>
    `
})
export class ExpandPanelAccordionComponent implements AfterViewInit {
    @Output() expandedChange = new EventEmitter<number>();
    @Input()
    @coerce(
        v => v,
        (v: number, self: ExpandPanelAccordionComponent) => self.expandedChange.emit(v)
    )
    expanded: number;

    @ContentChildren(ExpandPanelComponent, { descendants: true })
    expandPanels: QueryList<ExpandPanelComponent>;

    @ContentChildren(ExpandPanelComponent, { read: ViewContainerRef, descendants: true })
    expandPanelsRefs: QueryList<ViewContainerRef>;

    expandedPanelsExpandSubscription: Subscription = Subscription.EMPTY;

    ngAfterViewInit() {
        this.subscribeExpandedPanelsExpand();
        this.subscribeAutoscrollToSelected();
    }

    expand(idx: number) {
        if (idx !== null) {
            this.expandPanels.filter((_, i) => i !== idx).forEach(p => p.collapse());
        }
        this.expanded = idx;
    }

    private subscribeAutoscrollToSelected() {
        combineLatest([
            this.expandPanelsRefs.changes.pipe(startWith(this.expandPanelsRefs)),
            this.expandPanels.changes.pipe(startWith(this.expandPanels))
        ])
            .pipe(
                map(([refs, components]) => ({
                    ref: refs.toArray()[this.expanded],
                    component: components.toArray()[this.expanded]
                })),
                filter(({ ref, component }) => !!ref && !!component),
                first(),
                delay(INIT_DELAY_MS),
                switchMap(({ ref, component }) =>
                    combineLatest([
                        smoothChangeTo(
                            window.pageYOffset,
                            ref.element.nativeElement.offsetTop - SCROLL_TO_Y_OFFSET_PX,
                            SCROLL_TIME_MS
                        ),
                        of(component)
                    ])
                ),
                map(([scrollY, component]) => ({ scrollY, component }))
            )
            .subscribe(({ scrollY, component }) => this.scrollTo(component, scrollY));
    }

    private subscribeExpandedPanelsExpand() {
        this.expandPanels.changes
            .pipe(
                startWith(this.expandPanels),
                switchMap((expandPanels: QueryList<ExpandPanelComponent>) =>
                    merge(
                        ...expandPanels.toArray().map((expandPanel, idx) =>
                            expandPanel.expandedChange.pipe(
                                filter(e => e),
                                mapTo(idx)
                            )
                        )
                    )
                )
            )
            .subscribe(idx => this.expand(idx));
    }

    private scrollTo(component: ExpandPanelComponent, scrollTo: number) {
        window.scroll(0, scrollTo);
        if (!component.expanded) {
            component.expand();
        }
    }
}
