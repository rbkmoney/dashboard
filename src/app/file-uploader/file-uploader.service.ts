import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilesService } from '../api/files';

@Injectable()
export class FileUploaderService {
    uploadedFilesIds$ = new EventEmitter<string[]>();

    isUploading$ = new BehaviorSubject<boolean>(false);

    constructor(private filesService: FilesService) {}

    uploadFiles(files: File[]): Observable<void> {
        this.isUploading$.next(true);
        return this.filesService.uploadFiles(files).pipe(
            map(uploadedFiles => {
                this.isUploading$.next(false);
                this.uploadedFilesIds$.emit(uploadedFiles);
            })
        );
    }
}
