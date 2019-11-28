import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilesService } from '../api/files';
import { FileDownload } from '../api-codegen/dark-api/swagger-codegen';
import { download } from '../../utils/download';

@Injectable()
export class FileItemService {
    constructor(private filesService: FilesService) {}

    private getFileDownloadUrl(fileID: string): Observable<FileDownload> {
        return this.filesService.downloadFile(fileID);
    }

    downloadFile(fileID: string): Observable<void> {
        return this.getFileDownloadUrl(fileID).pipe(map(({ url }) => download(url)));
    }
}
