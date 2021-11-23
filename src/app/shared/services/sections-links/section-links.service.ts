import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { WalletService } from '@dsh/api/wallet';

import { IntegrationService, IntegrationsEnum } from '../../../integration';
import { SectionLink } from './model';
import { createLinks } from './utils';

@Injectable()
export class SectionsLinksService {
    sectionLinks$: Observable<SectionLink[]> = combineLatest([
        this.transloco.selectTranslateObject<{ [k: string]: string }>('sectionLinks'),
        this.walletsService.hasWallets$,
    ]).pipe(
        map((v) => createLinks(...v, this.hideMain)),
        first()
    );

    get hideMain(): boolean {
        return this.integrationService.integration !== IntegrationsEnum.Rbkmoney;
    }

    constructor(
        private walletsService: WalletService,
        private transloco: TranslocoService,
        private integrationService: IntegrationService
    ) {}
}
