import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-private-entity-info',
    templateUrl: 'private-entity-info.component.html'
})
export class PrivateEntityInfoComponent {
    layoutGap = '20px';

    @Input() form;
}
