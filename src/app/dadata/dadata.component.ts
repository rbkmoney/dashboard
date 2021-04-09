import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, ElementRef, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import get from 'lodash.get';
import { interval, Observable } from 'rxjs';
import { debounce, filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { BankContent, DaDataRequest, FmsUnitContent, FmsUnitQuery, PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { ContentByRequestType, DaDataService, ParamsByRequestType, Suggestion } from '@dsh/api/dadata';
import { CustomFormControl } from '@dsh/components/form-controls';

import { progress, takeError } from '../custom-operators';
import { Type } from './type';

interface Option<S extends Suggestion> {
    header: string;
    description: string;
    value: S;
}

const ReqType = DaDataRequest.DaDataRequestTypeEnum;
type ReqType = DaDataRequest.DaDataRequestTypeEnum;

const requestTypeByType: { [name in Type]: ReqType } = {
    address: ReqType.AddressQuery,
    bank: ReqType.BankQuery,
    fio: ReqType.FioQuery,
    fmsUnit: ReqType.FmsUnitQuery,
    okved: ReqType.OkvedQuery,
    party: ReqType.PartyQuery,
};
type RequestTypeByType = typeof requestTypeByType;

@Component({
    selector: 'dsh-dadata-autocomplete',
    styleUrls: ['dadata.component.scss'],
    templateUrl: 'dadata.component.html',
    providers: [{ provide: MatFormFieldControl, useExisting: DaDataAutocompleteComponent }],
})
export class DaDataAutocompleteComponent<
    T extends Type = Type,
    R extends ReqType = RequestTypeByType[T]
> extends CustomFormControl {
    suggestions$: Observable<ContentByRequestType[R][]> = this.formControl.valueChanges.pipe(
        debounce(() => interval(300)),
        switchMap(this.loadSuggestions.bind(this)),
        shareReplay(1)
    );
    options$: Observable<Option<ContentByRequestType[R]>[]> = this.suggestions$.pipe(
        map((suggestions) => suggestions.map((s) => this.getOption(s))),
        shareReplay(1)
    );
    isOptionsLoading$: Observable<boolean> = progress(this.formControl.valueChanges, this.suggestions$).pipe(
        shareReplay(1)
    );

    @Output() optionSelected = new EventEmitter<ContentByRequestType[R]>();
    @Output() errorOccurred = new EventEmitter<any>();
    @Output() suggestionNotFound = new EventEmitter();

    @Input() type: T;
    @Input() params: ParamsByRequestType[R];

    constructor(
        focusMonitor: FocusMonitor,
        elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
        platform: Platform,
        autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective,
        private daDataService: DaDataService
    ) {
        super(
            focusMonitor,
            elementRef,
            platform,
            ngControl,
            autofillMonitor,
            defaultErrorStateMatcher,
            parentForm,
            parentFormGroup
        );
        this.isOptionsLoading$.subscribe();
        this.options$.subscribe();
        this.suggestions$.pipe(filter((s) => !s)).subscribe(() => this.suggestionNotFound.next());
        this.suggestions$.pipe(takeError).subscribe((error) => this.errorOccurred.next(error));
    }

    optionSelectedHandler(e: MatAutocompleteSelectedEvent) {
        const idx = e.source.options.toArray().findIndex((option) => option === e.option);
        this.options$.pipe(take(1)).subscribe((options) => this.optionSelected.next(options[idx].value));
    }

    private loadSuggestions() {
        const params = { query: this.formControl.value as string } as ParamsByRequestType[R];
        return this.daDataService.suggest(requestTypeByType[this.type], this.withSpecificParams(params));
    }

    private withSpecificParams(params: ParamsByRequestType[R]): ParamsByRequestType[R] {
        switch (this.type) {
            case 'fmsUnit': {
                const fmsUnitParams = { ...params } as FmsUnitQuery;
                fmsUnitParams.queryType = 'FullTextSearch';
                return fmsUnitParams as any;
            }
            default:
                return params;
        }
    }

    private getOption(suggestion: ContentByRequestType[R]): Option<ContentByRequestType[R]> {
        return {
            header: (suggestion as any).value || '',
            description: this.getDescription(suggestion),
            value: suggestion,
        };
    }

    private getDescription(suggestion: ContentByRequestType[R]): string {
        switch (this.type) {
            case 'bank': {
                const { bic, address } = suggestion as BankContent;
                return [bic, get(address, ['value'])].filter((v) => !!v).join(' ');
            }
            case 'party': {
                const { inn, ogrn, address } = suggestion as PartyContent;
                const innOGRN = [inn, ogrn].filter((v) => !!v).join('/');
                return [innOGRN, get(address, ['value'])].filter((v) => !!v).join(' ');
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
