import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InvoicesService as BaseInvoicesService } from './swagger-codegen/api/invoices.service';

@Injectable()
export class InvoicesService extends BaseInvoicesService {
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
