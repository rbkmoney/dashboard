import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dsh-tab-header',
    exportAs: 'dshTabHeader',
    templateUrl: 'tab-header.component.html',
    // styleUrls: ['tab-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DshTabHeaderComponent {

    @Input()
    selectedIndex: string;

}
