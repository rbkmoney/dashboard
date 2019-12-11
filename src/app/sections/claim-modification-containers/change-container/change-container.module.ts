import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { PanelModule } from '../../../layout/panel';
import { DocumentModificationModule } from './document-modification-info';
import { ChangeContainerComponent } from './change-container.component';

@NgModule({
    imports: [CommonModule, PanelModule, FlexLayoutModule, TranslocoModule, DocumentModificationModule],
    declarations: [ChangeContainerComponent],
    exports: [ChangeContainerComponent]
})
export class ChangeContainerModule {}
