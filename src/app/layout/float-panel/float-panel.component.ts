import { Component } from '@angular/core';

import { FloatPanelService } from './float-panel.service';

@Component({
    selector: 'dsh-float-panel',
    templateUrl: 'float-panel.component.html',
    styleUrls: ['float-panel.component.scss'],
    providers: [FloatPanelService]
})
export class FloatPanelComponent {
    get expand() {
        return this.floatPanelService.expand;
    }

    get isExpanded() {
        return this.floatPanelService.isExpanded;
    }

    constructor(private floatPanelService: FloatPanelService) {}
}
