import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewContainerRef,
} from '@angular/core';
import { combineLatest, merge, of } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, startWith, switchMap, take } from 'rxjs/operators';

import { coerce, smoothChangeTo } from '../../../utils';
import { AccordionItemComponent } from './accordion-item';

const INIT_DELAY_MS = 350;
const SCROLL_TO_Y_OFFSET_PX = 80;
const SCROLL_TIME_MS = 500;

@Component({
    selector: 'dsh-accordion',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterViewInit {
    @Input()
    @coerce((v) => v, (v: number, self: AccordionComponent) => self.expandedChange.emit(v))
    expanded: number;

    @Output() expandedChange = new EventEmitter<number>();

    @ContentChildren(AccordionItemComponent, { descendants: true })
    private accordionItems: QueryList<AccordionItemComponent>;

    @ContentChildren(AccordionItemComponent, { read: ViewContainerRef, descendants: true })
    private accordionItemsRefs: QueryList<AccordionItemComponent>;

    ngAfterViewInit() {
        this.subscribeExpandedPanelsExpand();
        this.subscribeAutoScrollToSelected();
    }

    private subscribeAutoScrollToSelected() {
        combineLatest([
            this.accordionItemsRefs.changes.pipe(startWith(this.accordionItemsRefs)),
            this.accordionItems.changes.pipe(startWith(this.accordionItems)),
        ])
            .pipe(
                map(([refs, components]) => ({
                    ref: refs.toArray()[this.expanded],
                    component: components.toArray()[this.expanded],
                })),
                filter(({ ref, component }) => !!ref && !!component),
                take(1),
                delay(INIT_DELAY_MS),
                switchMap(({ ref, component }) =>
                    combineLatest([
                        smoothChangeTo(
                            window.pageYOffset,
                            ref.element.nativeElement.offsetTop - SCROLL_TO_Y_OFFSET_PX,
                            SCROLL_TIME_MS
                        ),
                        of(component),
                    ])
                ),
                map(([scrollY, component]) => ({ scrollY, component }))
            )
            .subscribe(({ scrollY, component }) => this.scrollTo(component, scrollY));
    }

    private subscribeExpandedPanelsExpand() {
        this.accordionItems.changes
            .pipe(
                startWith(this.accordionItems),
                switchMap((accordionItems: QueryList<AccordionItemComponent>) =>
                    merge(
                        ...accordionItems
                            .toArray()
                            .map((accordionItem, idx) =>
                                accordionItem.expandedChange.pipe(map((isExpand) => ({ idx, isExpand })))
                            )
                    )
                ),
                distinctUntilChanged()
            )
            .subscribe(({ idx, isExpand }) => this.toggle(idx, isExpand));
    }

    private toggle(idx: number, isExpand: boolean) {
        let expanded = idx;
        if (isExpand) {
            this.accordionItems.filter((p, i) => p.expanded && i !== idx).forEach((p) => p.collapse());
            expanded = idx;
        } else {
            expanded = this.accordionItems.toArray().findIndex((p) => p.expanded);
        }
        if (this.expanded !== expanded) {
            this.expanded = expanded;
        }
    }

    private scrollTo(component: AccordionItemComponent, scrollTo: number) {
        window.scroll(0, scrollTo);
        if (!component.expanded) {
            component.expand();
        }
    }
}
