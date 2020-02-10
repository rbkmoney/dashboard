import { Component, AfterViewInit, ContentChild } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';

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
