import { Component } from '@angular/core';

import { LayoutService } from './layout.service';

@Component({
    selector: 'dsh-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    providers: []
})
export class LayoutComponent {
    get isShowSidenav() {
        return this.layoutService.isShowSidenav;
    }

    constructor(private layoutService: LayoutService) {}
}
