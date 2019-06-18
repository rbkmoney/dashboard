import { Component, Input, HostBinding } from '@angular/core';

export enum Color {
    success = 'success',
    pending = 'pending',
    warn = 'warn'
}

@Component({
    selector: 'dsh-status',
    templateUrl: 'status.component.html',
    styleUrls: ['status.component.scss']
})
export class StatusComponent {
    @Input() color: Color;

    @HostBinding('class.dsh-status') baseClass = true;

    @HostBinding('class.dsh-status-success')
    get success() {
        return this.color === Color.success;
    }

    @HostBinding('class.dsh-status-pending')
    get pending() {
        return this.color === Color.pending;
    }

    @HostBinding('class.dsh-status-warn')
    get warn() {
        return this.color === Color.warn;
    }
}
