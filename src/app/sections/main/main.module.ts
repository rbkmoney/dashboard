import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';

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
        TranslocoModule
    ],
    declarations: [MainComponent, PaymentsComponent, WalletsComponent]
})
export class MainModule {}
