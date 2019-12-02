import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileItemComponent } from './file-item.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule],
    declarations: [FileItemComponent],
    exports: [FileItemComponent]
})
export class FileItemModule {}
