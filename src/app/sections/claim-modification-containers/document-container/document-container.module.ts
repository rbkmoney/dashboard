import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { QuestionaryModule } from '../../../api';
import { DetailsItemModule } from '../../../details-item';
import { PanelModule } from '../../../layout/panel';
import { AdditionalInfoComponent } from './additional-info';
import { AuthorityConfirmingDocumentInfoComponent } from './authority-confirming-document-info';
import { BankAccountInfoComponent } from './bank-account-info';
import { BeneficialOwnerInfoComponent } from './beneficial-owner-info';
import { ContactInfoComponent } from './contact-info';
import { DocumentContainerPanelComponent } from './document-container-panel';
import { DocumentContainerComponent } from './document-container.component';
import { IdentityDocumentInfoComponent } from './identity-document-info';
import { IndividualEntityInfoComponent } from './individual-entity-info';
import { LegalOwnerInfoComponent } from './legal-owner-info';
import { OrgInfoComponent } from './org-info';
import { RussianPrivateEntityInfoComponent } from './russian-private-entity-info';
import { ShopInfoComponent } from './shop-info';
import { YesNoPipe } from './yes-no.pipe';

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
        BeneficialOwnerInfoComponent,
        YesNoPipe
    ],
    exports: [DocumentContainerComponent]
})
export class DocumentContainerModule {}
