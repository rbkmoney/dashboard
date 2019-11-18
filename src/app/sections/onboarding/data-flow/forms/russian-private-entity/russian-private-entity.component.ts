import { Component } from '@angular/core';

import { RussianPrivateEntityService } from './russian-private-entity.service';

@Component({
    selector: 'dsh-russian-private-entity',
    templateUrl: 'russian-private-entity.component.html',
    styleUrls: ['russian-private-entity.component.scss'],
    providers: [RussianPrivateEntityService]
})
export class RussianPrivateEntityComponent {
    form$ = this.russianPrivateEntityService.form$;

    constructor(private russianPrivateEntityService: RussianPrivateEntityService) {}
}
