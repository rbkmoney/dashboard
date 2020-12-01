import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelTypesModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';

import { ClaimDetailsComponent } from './claim-details.component';
import { ClaimInfoComponent } from './components/claim-info/claim-info.component';

@NgModule({
    declarations: [ClaimDetailsComponent, ClaimInfoComponent],
    imports: [
        FlexModule,
        MatDividerModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        CommonModule,
        MatIconModule,
        ApiModelTypesModule,
    ],
    exports: [ClaimDetailsComponent],
})
export class ClaimDetailsModule {}
