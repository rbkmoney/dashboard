import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../config/config.service';
import { Req, BriefReport } from './gen-model/req';
import { Analytics } from './gen-model/analytics';
import { Contacts } from './gen-model/contacts';
import { Licences } from './gen-model/licences';
import { Buh } from './gen-model/buh';
import { Fssp } from './gen-model/fssp';
import { Stat } from './gen-model/stat';
import { GovPurchasesOfParticipant } from './gen-model/govPurchasesOfParticipant';
import { GovPurchasesOfCustomer } from './gen-model/govPurchasesOfCustomer';

interface InnOgrn {
    inn?: string;
    ogrn?: string;
}

interface Skip {
    skip?: number;
}

type InnOgrnList = Partial<Record<keyof InnOgrn, string | string[]>>;

type PDF = any;

@Injectable()
export class KonturFocusService {
    constructor(private http: HttpClient, private config: ConfigService) {}

    private request<T>(method: 'get', url: string, params?: any): Observable<T> {
        return this.http.request<T>(method, `${this.config.konturFocus.apiV3Url}/${url}`, {
            params
        });
    }

    private innOgrnToString({ inn, ogrn, ...rest }: InnOgrnList): InnOgrn {
        return {
            ...rest,
            inn: Array.isArray(inn) ? inn.join(',') : inn,
            ogrn: Array.isArray(ogrn) ? ogrn.join(',') : ogrn
        };
    }

    req(params: InnOgrnList): Observable<Req> {
        return this.request('get', 'req', this.innOgrnToString(params));
    }

    excerpt(params: InnOgrn): Observable<PDF> {
        return this.request('get', 'excerpt', params);
    }

    briefReport(params: InnOgrnList): Observable<BriefReport> {
        return this.request('get', 'briefReport', this.innOgrnToString(params));
    }

    analytics(params: InnOgrnList): Observable<Analytics> {
        return this.request('get', 'analytics', this.innOgrnToString(params));
    }

    contacts(params: InnOgrnList): Observable<Contacts> {
        return this.request('get', 'contacts', this.innOgrnToString(params));
    }

    egrDetails(params: InnOgrnList): Observable<Contacts> {
        return this.request('get', 'egrDetails', this.innOgrnToString(params));
    }

    licences(params: InnOgrnList): Observable<Licences> {
        return this.request('get', 'licences', this.innOgrnToString(params));
    }

    buh(params: InnOgrnList): Observable<Buh> {
        return this.request('get', 'buh', this.innOgrnToString(params));
    }

    fssp(params: InnOgrn & Skip): Observable<Fssp> {
        return this.request('get', 'fssp', this.innOgrnToString(params));
    }

    govPurchasesOfParticipant(params: InnOgrn & Skip): Observable<GovPurchasesOfParticipant> {
        return this.request('get', 'govPurchasesOfParticipant', this.innOgrnToString(params));
    }

    govPurchasesOfCustomer(params: InnOgrn & Skip): Observable<GovPurchasesOfCustomer> {
        return this.request('get', 'govPurchasesOfCustomer', this.innOgrnToString(params));
    }

    finan(params: InnOgrn): Observable<PDF> {
        return this.request('get', 'finan', this.innOgrnToString(params));
    }

    stat(): Observable<Stat> {
        return this.request('get', 'stat');
    }
}
