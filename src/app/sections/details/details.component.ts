import { Component } from '@angular/core';

import { toolbarOffset } from '../../layout-settings';

@Component({
    selector: 'dsh-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
    toolbarOffset = toolbarOffset;
}
