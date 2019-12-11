import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDividerModule } from '@angular/material';

import { DetailsItemModule } from '../../../../details-item';
import { DocumentModificationInfoComponent } from './document-modification-info.component';
import { ShopInfoComponent } from './shop-info';
import { ContactInfoComponent } from './contact-info';
import { BankAccountInfoComponent } from './bank-account-info';
import {
    ContractorInfoComponent,
    LegalEntityContractorInfoComponent,
    LegalOwnerInfoComponent,
    IdentityDocumentComponent,
    AdditionalInfoComponent,
    IndividualEntityContractorInfoComponent,
    RussianPrivateEntityComponent,
    AuthorityConfirmingDocumentComponent
} from './contractor-info';
import { QuestionaryModule } from '../../../../api';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, QuestionaryModule, DetailsItemModule, MatDividerModule],
    declarations: [
        DocumentModificationInfoComponent,
        ShopInfoComponent,
        ContactInfoComponent,
        BankAccountInfoComponent,
        ContractorInfoComponent,
        LegalEntityContractorInfoComponent,
        LegalOwnerInfoComponent,
        RussianPrivateEntityComponent,
        IdentityDocumentComponent,
        AuthorityConfirmingDocumentComponent,
        AdditionalInfoComponent,
        IndividualEntityContractorInfoComponent
    ],
    exports: [DocumentModificationInfoComponent]
})
export class DocumentModificationModule {}
