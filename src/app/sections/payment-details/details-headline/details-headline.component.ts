import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-details-headline',
    templateUrl: './details-headline.component.html',
    styleUrls: ['./details-headline.component.scss']
})
export class DetailsHeadlineComponent {
    @Input() paymentID: string;
}
