import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { PanelModule } from '../../layout/panel';
import {
    ChangeContainerComponent,
    DocumentModificationInfoComponent,
    ShopInfoComponent,
    ContactInfoComponent
} from './change-container';
import { QuestionaryModule } from '../../api';
import { DetailsItemModule } from '../../details-item';

@NgModule({
    imports: [CommonModule, PanelModule, FlexLayoutModule, TranslocoModule, QuestionaryModule, DetailsItemModule],
    declarations: [
        ChangeContainerComponent,
        DocumentModificationInfoComponent,
        ShopInfoComponent,
        ContactInfoComponent
    ],
    exports: [ChangeContainerComponent, DocumentModificationInfoComponent, ShopInfoComponent]
})
export class ClaimModificationContainersModule {}
