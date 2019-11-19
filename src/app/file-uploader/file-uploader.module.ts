import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { ngfModule } from 'angular-file';

import { FileUploaderComponent } from './file-uploader.component';
import { FilesModule } from '../api';

@NgModule({
    imports: [TranslocoModule, FlexModule, ngfModule, CommonModule, FilesModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent]
})
export class FileUploaderModule {}
