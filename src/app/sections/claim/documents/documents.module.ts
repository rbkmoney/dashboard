import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { FileUploaderModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';

import { FilesService } from '../../../api/files';
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
        FileContainerModule,
    ],
    declarations: [DocumentsComponent],
    providers: [FilesService, ReceiveClaimService],
})
export class DocumentsModule {}
