import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dsh-details-headline',
    templateUrl: './details-headline.component.html',
    styleUrls: ['./details-headline.component.scss']
})
export class DetailsHeadlineComponent implements OnInit {
    @Input() paymentID: string;

    constructor() { }

    ngOnInit() {
    }

}
