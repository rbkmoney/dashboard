import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { FileContainerComponent } from './file-container.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MatIconModule, LayoutModule, TranslocoModule],
    declarations: [FileContainerComponent],
    exports: [FileContainerComponent]
})
export class FileContainerModule {}
