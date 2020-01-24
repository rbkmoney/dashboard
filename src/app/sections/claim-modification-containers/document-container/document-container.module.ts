import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDividerModule } from '@angular/material';

import { DocumentContainerComponent } from './document-container.component';
import { PanelModule } from '../../../layout/panel';
import { DetailsItemModule } from '../../../details-item';
import { QuestionaryModule } from '../../../api';
import {
    RussianPrivateEntitySubContainerComponent,
    AuthorityConfirmingDocumentSubContainerComponent,
    IdentityDocumentSubContainerComponent,
    AdditionalInfoSubContainerComponent
} from './sub-containers';
import {
    ContactInfoPanelComponent,
    IndividualEntityPanelComponent,
    OrgInfoPanelComponent,
    LegalOwnerPanelComponent,
    BankAccountPanelComponent,
    DocumentContainerPanelComponent,
    ShopInfoPanelComponent
} from './panels';

@NgModule({
    imports: [
        CommonModule,
        PanelModule,
        FlexLayoutModule,
        TranslocoModule,
        QuestionaryModule,
        DetailsItemModule,
        MatDividerModule
    ],
    declarations: [
        DocumentContainerComponent,
        ShopInfoPanelComponent,
        DocumentContainerPanelComponent,
        BankAccountPanelComponent,
        IndividualEntityPanelComponent,
        RussianPrivateEntitySubContainerComponent,
        AuthorityConfirmingDocumentSubContainerComponent,
        IdentityDocumentSubContainerComponent,
        OrgInfoPanelComponent,
        LegalOwnerPanelComponent,
        AdditionalInfoSubContainerComponent,
        ContactInfoPanelComponent
    ],
    exports: [DocumentContainerComponent]
})
export class DocumentContainerModule {}
