import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ScreenSize, ScreenSizeControlService } from '@dsh/app/shared';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['../main-sections.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {
    isLaptopScreen$: Observable<boolean>;

    constructor(private screenSizeController: ScreenSizeControlService) {}

    ngOnInit() {
        this.isLaptopScreen$ = this.screenSizeController.screenSize$.pipe(
            map((screenSize: ScreenSize) => screenSize === ScreenSize.LAPTOP)
        );
    }
}
