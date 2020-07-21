import { Component, EventEmitter, Output } from '@angular/core';

import { Mascots } from '@dsh/components/global-banner/mascots';

@Component({
    selector: 'dsh-test-env-banner',
    templateUrl: 'test-env-banner.component.html',
    styleUrls: ['test-env-banner.component.scss'],
})
export class TestEnvBannerComponent {
    mascots = Mascots;

    @Output()
    closed = new EventEmitter();

    onClose() {
        this.closed.emit();
    }
}
