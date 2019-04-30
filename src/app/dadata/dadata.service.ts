import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SuggestionResult, SuggestionData, SuggestionParams } from './model/suggestions';
import { SuggestionType } from './model/type';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DaDataService {
    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    };

    constructor(private http: HttpClient, private config: ConfigService) {
        this.options.headers = this.options.headers.set('Authorization', config.daData.token);
    }

    getSuggestions<T extends SuggestionType>(
        type: T,
        query: string,
        params: SuggestionParams<T> = {}
    ): Observable<SuggestionData<T>[]> {
        if (!query) {
            return of([]);
        }
        return this.http
            .post<SuggestionResult<T>>(
                `${this.config.daData.suggestionsApiUrl}/${type}`,
                { query, ...(params as object) },
                this.options
            )
            .pipe(map(({ suggestions }) => suggestions));
    }
}
