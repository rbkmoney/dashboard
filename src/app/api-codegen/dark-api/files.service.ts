import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { FilesService as BaseFilesService } from './swagger-codegen/api/files.service';

@Injectable()
export class FilesService extends BaseFilesService {
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
