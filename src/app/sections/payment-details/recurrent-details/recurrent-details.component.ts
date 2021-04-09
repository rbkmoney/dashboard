import { Component, Input } from '@angular/core';

import { RecurrentPayer } from '@dsh/api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-recurrent-details',
    templateUrl: 'recurrent-details.component.html',
})
export class RecurrentDetailsComponent {
    @Input() recurrentPayer: RecurrentPayer;
}
