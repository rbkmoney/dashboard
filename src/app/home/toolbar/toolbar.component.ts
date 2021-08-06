import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { WalletService } from '@dsh/api/wallet';
import { coerceBoolean } from '@dsh/utils';

import { createLinks } from './utils';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() @coerceBoolean inverted: boolean;
    @Input() logoName: string;

    links$ = this.walletsService.hasWallets$.pipe(map(createLinks), shareReplay(1));

    constructor(private walletsService: WalletService) {}
}
