import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

import { NoContentModule } from '@dsh/app/shared/directives';
import { ButtonModule } from '@dsh/components/buttons';

import { BaseDialogComponent } from './base-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatDialogModule,
        ButtonModule,
        NoContentModule,
        MatDividerModule,
        MatButtonModule,
    ],
    declarations: [BaseDialogComponent],
    exports: [BaseDialogComponent],
})
export class BaseDialogModule {}
