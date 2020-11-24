import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';

import { ListItemComponent } from './components/list-item/list-item.component';

@Component({
    selector: 'dsh-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterContentInit {
    @Input() title: string;
    @Input() displayedCount = 5;

    displayedAll = false;

    @ContentChildren(ListItemComponent) contentChildren: QueryList<ListItemComponent>;

    ngAfterContentInit() {
        this.display();
    }

    showMore() {
        this.displayedAll = true;
        this.display();
    }

    private display() {
        this.contentChildren.forEach((item, idx) => (item.hidden = !this.displayedAll && idx >= this.displayedCount));
    }
}
