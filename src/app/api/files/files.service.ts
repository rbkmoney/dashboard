import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { FilesService as FilesApiService } from '../../api-codegen/dark-api';
import { FileData, FileDownload, FileUploadData } from '../../api-codegen/dark-api/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class FilesService {
    constructor(private filesService: FilesApiService, private http: HttpClient) {}

    uploadFiles(files: File[]): Observable<string[]> {
        return forkJoin(
            files.map(file =>
                this.getUploadLink().pipe(
                    switchMap(uploadData =>
                        forkJoin([of(uploadData.fileId), this.uploadFileToUrl(file, uploadData.url)])
                    ),
                    map(([fileId]) => fileId)
                )
            )
        );
    }

    getFileInfo(fileID: string): Observable<FileData> {
        return this.filesService.getFileInfo(genXRequestID(), fileID);
    }

    downloadFile(fileID: string): Observable<FileDownload> {
        return this.filesService.downloadFile(genXRequestID(), fileID);
    }

    private uploadFileToUrl(file: File, url: string): Observable<any> {
        return this.http.put(url, file, {
            headers: {
                'Content-Disposition': `attachment;filename=${file.name}`,
                'Content-Type': ''
            }
        });
    }

    private getUploadLink(): Observable<FileUploadData> {
        return this.filesService.uploadFile(genXRequestID(), { metadata: {} });
    }
}
