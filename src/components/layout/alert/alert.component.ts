import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dsh-alert',
    styleUrls: ['alert.component.scss'],
    templateUrl: 'alert.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
    @Input()
    hint: string;
}
