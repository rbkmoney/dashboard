import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { booleanDebounceTime } from '../../../../custom-operators';
import { LAYOUT_GAP } from '../../../constants';
import { ShopsService } from './shops.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopsService]
})
export class ShopsComponent {
    shops$ = this.shopsService.shops$;
    isLoading$ = this.shopsService.isLoading$.pipe(booleanDebounceTime());

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private shopsService: ShopsService) {}
}
