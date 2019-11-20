import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileItemComponent } from './file-item.component';
import { FileItemService } from './file-item.service';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule],
    declarations: [FileItemComponent],
    exports: [FileItemComponent],
    providers: [FileItemService]
})
export class FileItemModule {}
