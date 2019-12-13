import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { ngfModule } from 'angular-file';

import { FileUploaderComponent } from './file-uploader.component';
import { FilesModule } from '../api';
import { FileUploaderService } from './file-uploader.service';

@NgModule({
    imports: [TranslocoModule, FlexModule, ngfModule, CommonModule, FilesModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent],
    providers: [FileUploaderService]
})
export class FileUploaderModule {}
