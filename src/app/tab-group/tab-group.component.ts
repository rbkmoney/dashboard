import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material';



@Component({
    selector: 'dsh-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabGroupComponent extends MatTabGroup {

}
