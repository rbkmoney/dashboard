import { Component } from '@angular/core';

import { IconName, IconRegistryService } from './icon-registry.service';

@Component({
    selector: 'dsh-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private iconRegistryService: IconRegistryService) {
        this.iconRegistryService.register([
            IconName.logo,
            IconName.logo_white,
            IconName.user,
            IconName.notification,
            IconName.hor_dots,
            IconName.place_outline,
            IconName.bill,
            IconName.wallet,
            IconName.mir,
            IconName.mastercard,
            IconName.apple_pay,
            IconName.samsung_pay,
            IconName.google_pay,
            IconName.visa
        ]);
    }
}
