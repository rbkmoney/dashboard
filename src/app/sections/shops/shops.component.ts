import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    styleUrls: ['shops.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent {}
