import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

import { FileData, FileUploadData } from '../../api-codegen/dark-api/swagger-codegen';
import { FilesService as ApiFilesService } from '../../api-codegen/dark-api';
import { genXRequestID } from '../utils';

@Injectable()
export class FilesService {
    constructor(private filesService: ApiFilesService) {}

    uploadFiles(files: File[]): Observable<any> {
        return forkJoin(
            files.map(file =>
                this.getUploadLink().pipe(
                    map(uploadData => uploadData.url),
                    switchMap(url => this.uploadFileToUrl(file, url))
                )
            )
        );
    }

    getFileInfo(fileID: string): Observable<FileData> {
        return this.filesService.getFileInfo(genXRequestID(), fileID);
    }

    downloadFile(fileID: string) {
        return this.filesService.downloadFile(genXRequestID(), fileID);
    }

    private uploadFileToUrl(file: File, url: string): Observable<any> {
        console.log(url);
        // return this.http.put(
        //     url,
        //     file,
        //     { headers: { 'Content-Disposition': `attachment;filename=${file.name}` } }
        // );
        return of(file).pipe(delay(3000));
    }

    private getUploadLink(): Observable<FileUploadData> {
        return this.filesService.uploadFile(genXRequestID(), { metadata: {} });
    }
}
