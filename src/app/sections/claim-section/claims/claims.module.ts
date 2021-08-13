import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimsService } from '@dsh/api/claims';
import { ShopCreationModule } from '@dsh/app/shared/components/shop-creation';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';

import { ClaimsListModule } from './claims-list';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsSearchFiltersModule } from './claims-search-filters';
import { ClaimsComponent } from './claims.component';

@NgModule({
    imports: [
        ClaimsRoutingModule,
        LayoutModule,
        FlexModule,
        MatOptionModule,
        TranslocoModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        IndicatorsModule,
        MatIconModule,
        StateNavModule,
        ButtonModule,
        ClaimsListModule,
        ClaimsSearchFiltersModule,
        ShopCreationModule,
    ],
    declarations: [ClaimsComponent],
    exports: [ClaimsComponent],
    providers: [ClaimsService],
})
export class ClaimsModule {}
