import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';

import { ClaimsListPipesModule } from '../pipes/claims-list-pipes.module';
import { ClaimDetailsComponent } from './claim-details.component';
import { ClaimActionsComponent } from './components/claim-actions/claim-actions.component';
import { ClaimInfoComponent } from './components/claim-info/claim-info.component';

@NgModule({
    declarations: [ClaimDetailsComponent, ClaimInfoComponent, ClaimActionsComponent],
    imports: [
        FlexModule,
        MatDividerModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        CommonModule,
        MatIconModule,
        ClaimsListPipesModule,
    ],
    exports: [ClaimDetailsComponent],
})
export class ClaimDetailsModule {}
