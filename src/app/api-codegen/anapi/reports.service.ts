import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ReportsService as BaseReportsService } from './swagger-codegen/api/reports.service';

@Injectable()
export class ReportsService extends BaseReportsService {
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
