import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-link-label',
    templateUrl: 'link-label.component.html',
    styleUrls: ['link-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkLabelComponent {}
