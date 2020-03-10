import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { AnalyticsService as BaseAnalyticsService } from './swagger-codegen/api/analytics.service';

@Injectable()
export class AnalyticsService extends BaseAnalyticsService {
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
