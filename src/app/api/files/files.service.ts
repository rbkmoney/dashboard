import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { FileData, FileDownload, FileUploadData } from '../../api-codegen/dark-api/swagger-codegen';
import { FilesService as ApiFilesService } from '../../api-codegen/dark-api';
import { genXRequestID } from '../utils';
import { switchForward } from '../../custom-operators/switch-forward';

@Injectable()
export class FilesService {
    constructor(private filesService: ApiFilesService, private http: HttpClient) {}

    uploadFiles(files: File[]): Observable<string[]> {
        return forkJoin(
            files.map(file =>
                this.getUploadLink().pipe(
                    switchForward(uploadData => this.uploadFileToUrl(file, uploadData.url)),
                    pluck('forward'),
                    map(uploadData => uploadData.fileId)
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
