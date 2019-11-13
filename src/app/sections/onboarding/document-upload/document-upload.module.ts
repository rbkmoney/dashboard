import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { DocumentUploadComponent } from './document-upload.component';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { SpinnerModule } from '../../../spinner';
import { InitialDataService } from './initial-data.service';
import { DocumentItemComponent } from './document-item/document-item.component';
import { FileUploaderModule } from '../../../file-uploader';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatIconModule,
        LayoutModule,
        ButtonModule,
        TranslocoModule,
        SpinnerModule,
        FileUploaderModule
    ],
    declarations: [DocumentUploadComponent, DocumentItemComponent],
    providers: [InitialDataService]
})
export class DocumentUploadModule {}
