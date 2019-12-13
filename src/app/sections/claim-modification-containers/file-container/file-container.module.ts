import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { FileContainerComponent } from './file-container.component';
import { PanelModule } from '../../../layout/panel';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule, PanelModule, TranslocoModule],
    declarations: [FileContainerComponent],
    exports: [FileContainerComponent]
})
export class FileContainerModule {}
