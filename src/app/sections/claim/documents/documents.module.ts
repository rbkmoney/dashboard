import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { DocumentsComponent } from './documents.component';
import { ButtonModule } from '../../../button';
import { LayoutModule } from '../../../layout';
import { FileItemModule } from '../../../file-item';
import { FilesService } from '../../../api/files';
import { FileUploaderModule } from '../../../file-uploader';
import { ReceiveClaimService } from '../receive-claim.service';
import { ClaimFilesModule } from '../../../claim-files';

@NgModule({
    imports: [
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule,
        FileItemModule,
        TranslocoModule,
        FileUploaderModule,
        ClaimFilesModule
    ],
    declarations: [DocumentsComponent],
    exports: [DocumentsComponent],
    providers: [FilesService, ReceiveClaimService]
})
export class DocumentsModule {}
