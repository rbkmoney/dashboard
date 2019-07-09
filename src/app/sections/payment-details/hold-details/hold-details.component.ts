import { Component, Input, OnInit } from '@angular/core';
import template from 'lodash.template';
import { Observable } from 'rxjs';

import { HoldDetailsService } from './hold-details.service';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html',
    styleUrls: ['./hold-details.component.scss']
})
export class HoldDetailsComponent implements OnInit {
    @Input() holdDate: string;

    private localePath = 'sections.paymentDetails.holdDetails';

    template = template;

    timeUntilHold$: Observable<string>;

    constructor(private holdDetailsService: HoldDetailsService) {}

    ngOnInit() {
        this.timeUntilHold$ = this.holdDetailsService.getHoldTimer(this.holdDate);
    }
}
