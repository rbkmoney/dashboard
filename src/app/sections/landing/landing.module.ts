import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { DocumentationComponent, PaymentsComponent, WalletsComponent } from './parts';

@NgModule({
    imports: [
        LandingRoutingModule,
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatIconModule,
        ButtonModule,
        SpinnerModule,
        MatSnackBarModule,
        TranslocoModule,
        LayoutModule,
    ],
    declarations: [LandingComponent, PaymentsComponent, WalletsComponent, DocumentationComponent],
})
export class LandingModule {}
