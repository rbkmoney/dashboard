import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ColoredIconModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { FileContainerComponent } from './file-container.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        LayoutModule,
        TranslocoModule,
        ConfirmActionDialogModule,
        MatDialogModule,
        ColoredIconModule,
    ],
    declarations: [FileContainerComponent],
    exports: [FileContainerComponent],
})
export class FileContainerModule {}
