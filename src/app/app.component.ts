import { Component } from '@angular/core';

import { IconRegistryService, IconName } from './icon-registry.service';

@Component({
    selector: 'dsh-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private iconRegistryService: IconRegistryService) {
        this.iconRegistryService.register([IconName.logo, IconName.user]);
    }
}
