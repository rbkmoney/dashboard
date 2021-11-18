import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxBootstrapIconsModule, x, download } from 'ngx-bootstrap-icons';

import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { FileContainerComponent } from './file-container.component';

const ICONS = {
    x,
    download,
};

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        LayoutModule,
        TranslocoModule,
        ConfirmActionDialogModule,
        MatDialogModule,
        NgxBootstrapIconsModule.pick(ICONS),
    ],
    declarations: [FileContainerComponent],
    exports: [FileContainerComponent],
})
export class FileContainerModule {}
