import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FilesService } from '../api/files';

@Injectable()
export class FileUploaderService {

    constructor(
        private filesService: FilesService
    ) {}

    uploadFiles(files: File[]): Observable<string[]> {
        return this.filesService.uploadFiles(files);
    }
}
