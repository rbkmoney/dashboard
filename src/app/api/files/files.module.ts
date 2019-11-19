import { NgModule } from '@angular/core';

import { FilesService } from './files.service';
import { FilesService as ApiFilesService } from '../../api-codegen/dark-api';

@NgModule({
    providers: [FilesService, ApiFilesService]
})
export class FilesModule {}
