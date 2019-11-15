import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ClaimsService as BaseClaimsService } from './swagger-codegen/api/claims.service';

@Injectable()
export class ClaimsService extends BaseClaimsService {
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
