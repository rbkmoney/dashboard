import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { FilesService as FilesApiService } from '@dsh/api-codegen/dark-api';
import { FileData, FileDownload, FileUploadData } from '@dsh/api-codegen/dark-api/swagger-codegen';

@Injectable()
export class FilesService {
    constructor(
        private filesService: FilesApiService,
        private http: HttpClient,
        private idGenerator: IdGeneratorService
    ) {}

    uploadFiles(files: File[]): Observable<string[]> {
        return forkJoin(
            files.map((file) =>
                this.getUploadLink().pipe(
                    switchMap((uploadData) =>
                        forkJoin([of(uploadData.fileId), this.uploadFileToUrl(file, uploadData.url)])
                    ),
                    map(([fileId]) => fileId)
                )
            )
        );
    }

    getFileInfo(fileID: string): Observable<FileData> {
        return this.filesService.getFileInfo(this.idGenerator.shortUuid(), fileID).pipe(
            map((file) => ({
                ...file,
                fileName: decodeURI(file.fileName),
            }))
        );
    }

    downloadFile(fileID: string): Observable<FileDownload> {
        return this.filesService.downloadFile(this.idGenerator.shortUuid(), fileID);
    }

    private uploadFileToUrl(file: File, url: string): Observable<any> {
        return this.http.put(url, file, {
            headers: {
                /* eslint-disable @typescript-eslint/naming-convention */
                'Content-Disposition': `attachment;filename=${encodeURI(file.name)}`,
                'Content-Type': '',
                /* eslint-enable @typescript-eslint/naming-convention */
            },
        });
    }

    private getUploadLink(): Observable<FileUploadData> {
        return this.filesService.uploadFile(this.idGenerator.shortUuid(), { metadata: {} });
    }
}
