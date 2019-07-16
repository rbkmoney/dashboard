import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HoldDetailsService } from './hold-details.service';

@Component({
    selector: 'dsh-hold-details',
    templateUrl: './hold-details.component.html',
    providers: [HoldDetailsService]
})
export class HoldDetailsComponent implements OnInit {
    @Input() holdDate: string;

    localePath = 'sections.paymentDetails.holdDetails';

    timeUntilHold$: Observable<string>;

    constructor(private holdDetailsService: HoldDetailsService) {}

    ngOnInit() {
        this.timeUntilHold$ = this.holdDetailsService.getHoldTimer(this.holdDate);
    }
}
