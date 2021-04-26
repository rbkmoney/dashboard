import { Component, HostBinding, Input } from '@angular/core';

import { StatusColor } from '../../../app/theme-manager';
import { coerceBoolean } from '../../../utils';

@Component({
    selector: 'dsh-status',
    templateUrl: 'status.component.html',
    styleUrls: ['status.component.scss'],
})
export class StatusComponent {
    @Input() color: StatusColor;

    @Input()
    @coerceBoolean
    mark = true;

    @HostBinding('class.dsh-status') baseClass = true;

    @HostBinding('class.dsh-status-success')
    get success() {
        return this.color === StatusColor.Success;
    }

    @HostBinding('class.dsh-status-pending')
    get pending() {
        return this.color === StatusColor.Pending;
    }

    @HostBinding('class.dsh-status-warn')
    get warn() {
        return this.color === StatusColor.Warn;
    }
}
