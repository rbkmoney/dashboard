import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDividerModule } from '@angular/material';

import { DocumentContainerComponent } from './document-container.component';
import { PanelModule } from '../../../layout/panel';
import { ShopInfoSubContainerComponent } from './shop-info-sub-container';
import { DetailsItemModule } from '../../../details-item';
import { QuestionaryModule } from '../../../api';
import { DocumentContainerPanelComponent } from './document-container-panel';
import { BankAccountSubContainerComponent } from './bank-account-sub-container';
import { RussianPrivateEntitySubContainerComponent } from './russian-private-entity-sub-container';
import { AuthorityConfirmingDocumentSubContainerComponent } from './authority-confirming-document-sub-container';
import { IdentityDocumentSubContainerComponent } from './identity-document-sub-container';
import { LegalOwnerSubContainerComponent } from './legal-owner-sub-container';
import { IndividualEntitySubContainerComponent } from './individual-entity-sub-container';
import { OrgInfoSubContainerComponent } from './org-info-sub-container';
import { AdditionalInfoSubContainerComponent } from './additional-info-sub-container';
import { ContactInfoSubContainerComponent } from './contact-info-sub-container';

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
        ShopInfoSubContainerComponent,
        DocumentContainerPanelComponent,
        BankAccountSubContainerComponent,
        IndividualEntitySubContainerComponent,
        RussianPrivateEntitySubContainerComponent,
        AuthorityConfirmingDocumentSubContainerComponent,
        IdentityDocumentSubContainerComponent,
        OrgInfoSubContainerComponent,
        LegalOwnerSubContainerComponent,
        AdditionalInfoSubContainerComponent,
        ContactInfoSubContainerComponent
    ],
    exports: [DocumentContainerComponent]
})
export class DocumentContainerModule {}
