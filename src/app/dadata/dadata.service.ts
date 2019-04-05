import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { SuggestionType } from './model/type';
import { Suggestions, Suggestion, PartySuggestionData } from './model/suggestions';
import { PartyParams } from './model/party';
import { map, switchMap } from 'rxjs/operators';
import { once } from '../shared/rxjs-helpers';

type Config = typeof import('../../assets/dadata-config.json');

export type SuggestionParams<T extends SuggestionType> = {
    [SuggestionType.party]: PartyParams;
}[T];

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
    ): Observable<Suggestion<PartySuggestionData>[]> {
        if (!query) {
            return of([]);
        }
        return this.config$.pipe(
            switchMap(({ suggestionsAPIUrl, token }) =>
                this.http
                    .post<Suggestions>(`${suggestionsAPIUrl}/${type}`, { query, ...params }, this.getOptions(token))
                    .pipe(map(({ suggestions }) => suggestions))
            )
        );
    }
}
