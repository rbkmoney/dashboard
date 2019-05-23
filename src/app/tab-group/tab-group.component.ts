import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TabComponent } from './tab/tab.component';



@Component({
    selector: 'dsh-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabGroupComponent {
    @ViewChild(TabComponent)
    tab;

    constructor() {
        console.log(this.tab);
    }

}
