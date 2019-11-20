import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FilesService } from '../api/files';
import { FileDownload } from '../api-codegen/dark-api/swagger-codegen';

@Injectable()
export class FileItemService {
    constructor(private filesService: FilesService) {}

    downloadFile(fileID: string): Observable<FileDownload> {
        return this.filesService.downloadFile(fileID);
    }
}
