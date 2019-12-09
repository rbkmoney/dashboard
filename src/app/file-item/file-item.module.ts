import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileItemComponent } from './file-item.component';
import { PanelModule } from '../layout/panel';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule, PanelModule],
    declarations: [FileItemComponent],
    exports: [FileItemComponent]
})
export class FileItemModule {}
