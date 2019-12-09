import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimFilesService } from './claim-files.service';
import { ClaimFilesComponent } from './claim-files.component';
import { FileItemModule } from '../file-item';
import { SpinnerModule } from '../spinner';
import { ClaimsService } from '../api/claims';

@NgModule({
    declarations: [ClaimFilesComponent],
    exports: [ClaimFilesComponent],
    imports: [CommonModule, FlexLayoutModule, FileItemModule, SpinnerModule, TranslocoModule],
    providers: [ClaimFilesService, ClaimsService]
})
export class ClaimFilesModule {}
