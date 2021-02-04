import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-inline-show-all-toggle',
    templateUrl: './inline-show-all-toggle.component.html',
    styleUrls: ['./inline-show-all-toggle.component.scss'],
})
export class InlineShowAllToggleComponent {
    @Input() opened: boolean;
}
