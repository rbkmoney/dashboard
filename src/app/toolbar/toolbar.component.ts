import { Component } from '@angular/core';

import { toolbarOffset } from '../layout-settings';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    toolbarOffset = toolbarOffset;
}
