import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'dsh-headline',
    templateUrl: 'headline.component.html',
    styleUrls: ['headline.component.scss']
})
export class HeadlineComponent {
    @Input() paymentID: string;

    constructor(private location: Location) {}

    // 1 and 2 is default history length
    isBackAvailable = window.history.length > 2;

    back() {
        this.location.back();
    }
}
