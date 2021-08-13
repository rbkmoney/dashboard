import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dsh-alert',
    styleUrls: ['alert.component.scss'],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
    @HostBinding('class.dsh-alert') class = true;
}
