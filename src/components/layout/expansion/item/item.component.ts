import { AfterViewInit, Component, ContentChild } from '@angular/core';

import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'dsh-expansion-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.scss']
})
export class ItemComponent implements AfterViewInit {
    @ContentChild(HeaderComponent) header;
    @ContentChild(ContentComponent) content;

    ngAfterViewInit(): void {
        this.header.toggleEvent.subscribe(opened => {
            this.content.opened = opened;
        });
    }
}
