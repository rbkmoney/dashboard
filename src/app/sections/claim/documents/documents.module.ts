import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { LayoutModule } from '@dsh/components/layout';

import { FilesService } from '../../../api/files';
import { FileUploaderModule } from '../../../file-uploader';
import { FileContainerModule } from '../../claim-modification-containers';
import { ReceiveClaimService } from '../receive-claim.service';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';

@NgModule({
    imports: [
        DocumentsRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule,
        TranslocoModule,
        FileUploaderModule,
        FileContainerModule
    ],
    declarations: [DocumentsComponent],
    providers: [FilesService, ReceiveClaimService]
})
export class DocumentsModule {}
