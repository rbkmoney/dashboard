import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-mini-card',
    templateUrl: './mini-card.component.html',
    styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent {
    @Input() title: string;
    @Input() subtitle: string;
}
