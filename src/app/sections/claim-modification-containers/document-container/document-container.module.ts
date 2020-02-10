import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDividerModule } from '@angular/material';

import { DocumentContainerComponent } from './document-container.component';
import { PanelModule } from '../../../layout/panel';
import { DetailsItemModule } from '../../../details-item';
import { QuestionaryModule } from '../../../api';
import { LegalOwnerInfoComponent } from './legal-owner-info';
import { OrgInfoComponent } from './org-info';
import { ShopInfoComponent } from './shop-info';
import { IndividualEntityInfoComponent } from './individual-entity-info';
import { DocumentContainerPanelComponent } from './document-container-panel';
import { BankAccountInfoComponent } from './bank-account-info';
import { ContactInfoComponent } from './contact-info';
import { AdditionalInfoComponent } from './additional-info';
import { AuthorityConfirmingDocumentInfoComponent } from './authority-confirming-document-info';
import { IdentityDocumentInfoComponent } from './identity-document-info';
import { RussianPrivateEntityInfoComponent } from './russian-private-entity-info';
import { BeneficialOwnerInfoComponent } from './beneficial-owner-info';

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
        OrgInfoComponent,
        ShopInfoComponent,
        LegalOwnerInfoComponent,
        IndividualEntityInfoComponent,
        DocumentContainerComponent,
        DocumentContainerPanelComponent,
        BankAccountInfoComponent,
        AdditionalInfoComponent,
        AuthorityConfirmingDocumentInfoComponent,
        IdentityDocumentInfoComponent,
        ContactInfoComponent,
        RussianPrivateEntityInfoComponent,
        BeneficialOwnerInfoComponent
    ],
    exports: [DocumentContainerComponent]
})
export class DocumentContainerModule {}
