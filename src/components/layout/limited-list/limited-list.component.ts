import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';

import { LimitedListItemComponent } from './components/limited-list-item/limited-list-item.component';

const DISPLAYED_COUNT = 5;

@Component({
    selector: 'dsh-limited-list',
    templateUrl: 'limited-list.component.html',
    styleUrls: ['limited-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitedListComponent implements AfterContentInit {
    @Input() title: string;
    @Input() displayedCount = DISPLAYED_COUNT;

    displayedAll = false;

    @ContentChildren(LimitedListItemComponent) contentChildren: QueryList<LimitedListItemComponent>;

    ngAfterContentInit(): void {
        this.displayContent();
    }

    showMore(): void {
        this.displayedAll = true;
        this.displayContent();
    }

    private displayContent(): void {
        this.contentChildren.forEach((item, idx) => (item.hidden = !this.displayedAll && idx >= this.displayedCount));
    }
}
