import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FilesService as BaseFilesService } from './swagger-codegen/api/files.service';

@Injectable()
export class FilesService extends BaseFilesService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
}
