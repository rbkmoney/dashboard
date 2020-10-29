import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { DropdownModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';

import { ClaimsService } from '../../api/claims';
import { ActionItemComponent } from './action-item';
import { ActionbarComponent } from './actionbar.component';
import { UserComponent } from './user';

@NgModule({
    imports: [
        MatIconModule,
        FlexLayoutModule,
        DropdownModule,
        OverlayModule,
        StateNavModule,
        ButtonModule,
        IndicatorsModule,
        MatMenuModule,
        RouterModule,
        CommonModule,
        TranslocoModule,
    ],
    declarations: [ActionbarComponent, ActionItemComponent, UserComponent],
    providers: [ClaimsService],
    exports: [ActionbarComponent],
})
export class ActionbarModule {}
