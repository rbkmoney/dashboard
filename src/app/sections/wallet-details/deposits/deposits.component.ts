import { Component } from '@angular/core';

import { DepositsService } from './deposits.service';

@Component({
    selector: 'dsh-deposits',
    templateUrl: './deposits.component.html',
    styleUrls: ['./deposits.component.scss'],
    providers: [DepositsService],
})
export class DepositsComponent {
    constructor() {}
}
