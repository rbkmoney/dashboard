import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';

import { SuggestionResult, SuggestionData, SuggestionParams } from './model/suggestions';
import { SuggestionType } from './model/type';

type Config = typeof import('../../assets/dadata-config.json');

@Injectable()
export class DaDataService {
    config$ = this.http.get<Config>('/assets/dadata-config.json').pipe(shareReplay(1));

    constructor(private http: HttpClient) {}

    getOptions(token: string) {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            })
        };
    }

    getSuggestions<T extends SuggestionType>(
        type: T,
        query: string,
        params: SuggestionParams<T> = {}
    ): Observable<SuggestionData<T>[]> {
        if (!query) {
            return of([]);
        }
        return this.config$.pipe(
            switchMap(({ suggestionsAPIUrl, token }) =>
                this.http
                    .post<SuggestionResult<T>>(
                        `${suggestionsAPIUrl}/${type}`,
                        { query, ...(params as object) },
                        this.getOptions(token)
                    )
                    .pipe(map(({ suggestions }) => suggestions))
            )
        );
    }
}
