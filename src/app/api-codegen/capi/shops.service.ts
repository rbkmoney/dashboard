import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ShopsService as BaseShopsService } from './swagger-codegen/api/shops.service';

@Injectable()
export class ShopsService extends BaseShopsService {
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
