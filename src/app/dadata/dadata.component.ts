import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import isEmpty from 'lodash-es/isEmpty';
import { interval, Observable } from 'rxjs';
import { debounce, filter, map, switchMap, take } from 'rxjs/operators';

import { BankContent, DaDataRequest, FmsUnitContent, FmsUnitQuery, PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { ContentByRequestType, DaDataService, ParamsByRequestType, Suggestion } from '@dsh/api/dadata';
import { progress, shareReplayUntilDestroyed, takeError } from '@dsh/operators';
import { coerceBoolean } from '@dsh/utils';

import { Type } from './type';

import DaDataRequestType = DaDataRequest.DaDataRequestTypeEnum;

interface Option<S extends Suggestion> {
    label: string;
    description: string;
    value: S;
}

type RequestTypeByType = { [name in Type]: DaDataRequestType };
const REQUEST_TYPE_BY_TYPE: RequestTypeByType = {
    address: DaDataRequestType.AddressQuery,
    bank: DaDataRequestType.BankQuery,
    fio: DaDataRequestType.FioQuery,
    fmsUnit: DaDataRequestType.FmsUnitQuery,
    okved: DaDataRequestType.OkvedQuery,
    party: DaDataRequestType.PartyQuery,
};

@UntilDestroy()
@Component({
    selector: 'dsh-dadata-autocomplete',
    styleUrls: ['dadata.component.scss'],
    templateUrl: 'dadata.component.html',
    providers: [provideValueAccessor(DaDataAutocompleteComponent)],
})
export class DaDataAutocompleteComponent<T extends Type = Type, R extends DaDataRequestType = RequestTypeByType[T]>
    extends WrappedFormControlSuperclass<string>
    implements OnInit
{
    @Input() type: T;
    @Input() params: ParamsByRequestType[R];
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    @Output() optionSelected = new EventEmitter<ContentByRequestType[R]>();
    @Output() errorOccurred = new EventEmitter<unknown>();
    @Output() suggestionNotFound = new EventEmitter();

    suggestions$: Observable<ContentByRequestType[R][]> = this.formControl.valueChanges.pipe(
        filter<string>(Boolean),
        debounce(() => interval(300)),
        switchMap((v) => this.loadSuggestions(v)),
        shareReplayUntilDestroyed(this)
    );
    options$: Observable<Option<ContentByRequestType[R]>[]> = this.suggestions$.pipe(
        map((suggestions) => suggestions.map((s) => this.getOption(s))),
        shareReplayUntilDestroyed(this)
    );
    isOptionsLoading$: Observable<boolean> = progress(this.formControl.valueChanges, this.suggestions$).pipe(
        shareReplayUntilDestroyed(this)
    );

    constructor(injector: Injector, private daDataService: DaDataService) {
        super(injector);
    }

    ngOnInit(): void {
        this.isOptionsLoading$.pipe(untilDestroyed(this)).subscribe();
        this.suggestions$.pipe(filter(isEmpty), untilDestroyed(this)).subscribe(() => this.suggestionNotFound.emit());
        this.suggestions$.pipe(takeError, untilDestroyed(this)).subscribe((error) => this.errorOccurred.next(error));
    }

    optionSelectedHandler(e: MatAutocompleteSelectedEvent): void {
        const idx = e.source.options.toArray().findIndex((option) => option === e.option);
        this.options$
            .pipe(take(1), untilDestroyed(this))
            .subscribe((options) => this.optionSelected.next(options[idx].value));
    }

    clear(): void {
        this.formControl.setValue('');
        this.optionSelected.emit(null);
    }

    private loadSuggestions(query: string): Observable<ContentByRequestType[R][]> {
        const params: ParamsByRequestType[R] = { query } as ParamsByRequestType[R];
        return this.daDataService.suggest(
            REQUEST_TYPE_BY_TYPE[this.type],
            this.withSpecificParams(params)
        ) as unknown as Observable<ContentByRequestType[R][]>;
    }

    private withSpecificParams(params: ParamsByRequestType[R]): ParamsByRequestType[R] {
        switch (this.type) {
            case 'fmsUnit': {
                const fmsUnitParams = { ...params } as FmsUnitQuery;
                fmsUnitParams.queryType = 'FullTextSearch';
                return fmsUnitParams;
            }
            default:
                return params;
        }
    }

    private getOption(suggestion: ContentByRequestType[R]): Option<ContentByRequestType[R]> {
        return {
            label: suggestion.value || '',
            description: this.getDescription(suggestion),
            value: suggestion,
        };
    }

    private getDescription(suggestion: ContentByRequestType[R]): string {
        switch (this.type) {
            case 'bank': {
                const { bic, address } = suggestion as BankContent;
                return [bic, address?.value].filter(Boolean).join(' ');
            }
            case 'party': {
                const { inn, ogrn, address } = suggestion as PartyContent;
                const innOGRN = [inn, ogrn].filter(Boolean).join('/');
                return [innOGRN, address?.value].filter(Boolean).join(' ');
            }
            case 'fmsUnit': {
                const { code } = suggestion as FmsUnitContent;
                return code;
            }
            default:
                return '';
        }
    }
}
