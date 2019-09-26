import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { MainComponent } from './main.component';
import { ButtonModule } from '../../button';
import { PaymentsComponent, WalletsComponent } from './parts';
import { SpinnerModule } from '../../spinner';

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
