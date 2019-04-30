import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../config/config.service';
import { Req } from './gen-model/req';

@Injectable()
export class KonturFocusService {
    constructor(private http: HttpClient, private config: ConfigService) {}

    private request<T>(method: 'get', url: string, params: any = {}): Observable<T> {
        return this.http.request<T>(method, `${this.config.konturFocus.apiV3Url}/${url}`, {
            params
        });
    }

    req(params: { inn: string } | { ogrn: string }): Observable<Req> {
        return this.request('get', 'req', params);
    }
}
