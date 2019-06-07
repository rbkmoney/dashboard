import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
    @HostBinding('class.dsh-card') class = true;
}
