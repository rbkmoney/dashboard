import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { DocumentUploadComponent } from './document-upload.component';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { SpinnerModule } from '../../../spinner';
import { FileUploaderModule } from '../../../file-uploader';
import { LeaveDialogComponent } from './leave-dialog';
import { FileItemModule } from '../../../file-item';
import { DocumentUploadRoutingModule } from './document-upload-routing.module';
import { ClaimFilesModule } from '../../../claim-files';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        DocumentUploadRoutingModule,
        MatIconModule,
        LayoutModule,
        ButtonModule,
        TranslocoModule,
        SpinnerModule,
        FileUploaderModule,
        MatDialogModule,
        FileItemModule,
        ClaimFilesModule
    ],
    declarations: [DocumentUploadComponent, LeaveDialogComponent],
    entryComponents: [LeaveDialogComponent]
})
export class DocumentUploadModule {}
