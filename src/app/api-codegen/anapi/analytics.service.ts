import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AnalyticsService as BaseAnalyticsService } from './swagger-codegen/api/analytics.service';

@Injectable()
export class AnalyticsService extends BaseAnalyticsService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
