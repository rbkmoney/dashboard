import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay } from 'rxjs/operators';

import { ClaimsService } from '../../api';
import { filterViewClaims } from '../../view-utils';
import { BrandType } from '../brand';
import { ToolbarLinksService } from './toolbar-links.service';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [ToolbarLinksService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() brandType: BrandType = BrandType.normal;

    links$ = this.toolbarLinksService.links$;
    active$ = this.toolbarLinksService.active$;
    hideNav$ = combineLatest([this.toolbarLinksService.links$, this.toolbarLinksService.active$]).pipe(
        map(([links, active]) => active === links[0]),
        shareReplay(1)
    );
    claimsBadge$ = this.claimsService.searchClaims(100, ['pending', 'review', 'pendingAcceptance']).pipe(
        pluck('result'),
        map(filterViewClaims),
        map((claims) => claims.length || undefined),
        distinctUntilChanged(),
        shareReplay(1)
    );

    constructor(private claimsService: ClaimsService, private toolbarLinksService: ToolbarLinksService) {}
}
