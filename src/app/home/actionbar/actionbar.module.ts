import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimsService } from '@dsh/api/claims';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { DropdownModule } from '@dsh/components/layout';

import { ActionbarComponent } from './actionbar.component';
import { ActionItemComponent } from './components/action-item';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';
import { UserComponent } from './components/user';

@NgModule({
    imports: [
        MatIconModule,
        FlexLayoutModule,
        DropdownModule,
        OverlayModule,
        ButtonModule,
        IndicatorsModule,
        MatMenuModule,
        RouterModule,
        CommonModule,
        TranslocoModule,
        MatDividerModule,
    ],
    declarations: [
        ActionbarComponent,
        ActionItemComponent,
        UserComponent,
        MenuItemComponent,
        OrganizationsListComponent,
    ],
    providers: [ClaimsService],
    exports: [ActionbarComponent],
})
export class ActionbarModule {}
