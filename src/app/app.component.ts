import { Component } from '@angular/core';

import { IconName, IconRegistryService } from './icon-registry.service';

@Component({
    selector: 'dsh-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private iconRegistryService: IconRegistryService) {
        this.iconRegistryService.register([IconName.logo, IconName.user, IconName.notification, IconName.hor_dots]);
    }
}
