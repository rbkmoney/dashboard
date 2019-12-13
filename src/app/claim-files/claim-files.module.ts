import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimFilesComponent } from './claim-files.component';
import { FileContainerModule } from '../sections/claim-modification-containers/file-container';
import { SpinnerModule } from '../spinner';
import { ClaimsService } from '../api/claims';
import { FileUploaderModule } from '../file-uploader';

@NgModule({
    declarations: [ClaimFilesComponent],
    exports: [ClaimFilesComponent],
    imports: [CommonModule, FlexLayoutModule, FileContainerModule, SpinnerModule, TranslocoModule, FileUploaderModule],
    providers: [ClaimsService]
})
export class ClaimFilesModule {}
