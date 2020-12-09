import { NgModule } from '@angular/core';

import { FilesService as ApiFilesService } from '@dsh/api-codegen/dark-api';

import { FilesService } from './files.service';

@NgModule({
    providers: [FilesService, ApiFilesService],
})
export class FilesModule {}
