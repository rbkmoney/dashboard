import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-actions',
    templateUrl: 'actions.component.html'
})
export class ActionsComponent {
    @Input()
    id: string;
}
