import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { SuggestionType } from './model/type';
import { map, switchMap } from 'rxjs/operators';

import { once } from '../shared/rxjs-helpers';
import { PartySuggest } from './model/party';
import { AddressSuggest } from './model/address';

type Config = typeof import('../../assets/dadata-config.json');

export type RequestSuggestions = { [name in SuggestionType]: any } & {
    [SuggestionType.party]: PartySuggest;
    [SuggestionType.address]: AddressSuggest;
};

export type SuggestionParams<T extends SuggestionType> = RequestSuggestions[T]['params'];
export type SuggestionResult<T extends SuggestionType> = RequestSuggestions[T]['result'];
export type SuggestionData<T extends SuggestionType> = SuggestionResult<T>['suggestions'];

@Injectable()
export class DaDataService {
    config$ = once(this.http.get<Config>('/assets/dadata-config.json'));

    constructor(private http: HttpClient) {
        this.getSuggestions(SuggestionType.party, 'hello').subscribe(r => r);
    }

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
    ): Observable<SuggestionData<T>> {
        if (!query) {
            return of([]);
        }
        return this.config$.pipe(
            switchMap(({ suggestionsAPIUrl, token }) =>
                this.http
                    .post<SuggestionResult<T>>(
                        `${suggestionsAPIUrl}/${type}`,
                        { query, ...params },
                        this.getOptions(token)
                    )
                    .pipe(map(({ suggestions }) => suggestions))
            )
        );
    }
}
