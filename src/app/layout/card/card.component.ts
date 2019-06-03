import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @HostBinding('class.dsh-card') classList = true;
}
