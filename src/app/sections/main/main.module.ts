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

import { ThemeManagerModule } from '../../theme-manager';
import { MainComponent } from './main.component';
import { PaymentsComponent, WalletsComponent } from './parts';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatIconModule,
        ButtonModule,
        SpinnerModule,
        MatSnackBarModule,
        TranslocoModule,
        LayoutModule,
        ThemeManagerModule,
    ],
    declarations: [MainComponent, PaymentsComponent, WalletsComponent],
})
export class MainModule {}
