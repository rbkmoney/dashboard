import { Component } from '@angular/core';

import { FloatPanelService } from '../float-panel.service';

@Component({
    selector: 'dsh-float-panel-more',
    templateUrl: 'float-panel-more.component.html',
    styleUrls: ['float-panel-more.component.scss']
})
export class FloatPanelMoreComponent {
    get isExpanded() {
        return this.floatPanelService.isExpanded;
    }

    get close() {
        return this.floatPanelService.close;
    }

    get pin() {
        return this.floatPanelService.pinToggle;
    }

    constructor(private floatPanelService: FloatPanelService) {}
}
