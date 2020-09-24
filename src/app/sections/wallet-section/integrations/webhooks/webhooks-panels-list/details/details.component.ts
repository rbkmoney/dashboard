import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html',
})
export class DetailsComponent {
    @Input()
    url: string;

    @Input()
    identityName: string;

    @Input()
    walletName: string;
}
