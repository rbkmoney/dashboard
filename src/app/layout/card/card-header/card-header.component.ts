import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'dsh-card-header',
    templateUrl: 'card-header.component.html',
    styleUrls: ['card-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'dsh-card-header' }
})
export class CardHeaderComponent {}
