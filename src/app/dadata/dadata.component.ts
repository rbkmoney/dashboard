import { Component, ElementRef, Input, Optional, Self, Output, EventEmitter } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ErrorStateMatcher } from '@angular/material';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Observable, interval } from 'rxjs';
import { switchMap, debounce, tap } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { TranslocoService } from '@ngneat/transloco';

import { DaDataRequest, PartyContent, AddressQuery, FmsUnitQuery, BankContent } from '../api-codegen/aggr-proxy';
import { DaDataService, Suggestion, ParamsByRequestType, ContentByRequestType } from '../api';
import { type } from './type';
import { CustomFormControl } from '../form-controls';

interface Option<S extends Suggestion> {
    header: string;
    description: string;
    value: S;
}

const ReqType = DaDataRequest.DaDataRequestTypeEnum;
type ReqType = DaDataRequest.DaDataRequestTypeEnum;

const requestTypeByType: { [name in typeof type[number]]: ReqType } = {
    address: ReqType.AddressQuery,
    bank: ReqType.BankQuery,
    fio: ReqType.FioQuery,
    fmsUnit: ReqType.FmsUnitQuery,
    okved: ReqType.OkvedQuery,
    party: ReqType.PartyQuery
};

@Component({
    selector: 'dsh-dadata-autocomplete',
    styleUrls: ['dadata.component.scss'],
    templateUrl: 'dadata.component.html',
    providers: [{ provide: MatFormFieldControl, useExisting: DaDataAutocompleteComponent }]
})
export class DaDataAutocompleteComponent<
    T extends typeof type[number],
    C = ContentByRequestType[typeof requestTypeByType[T]]
> extends CustomFormControl {
    suggestions$: Observable<C[]>;
    options: Option<C>[];
    isOptionsLoading = false;

    @Output() optionSelected = new EventEmitter<C>();
    @Output() errorOccurred = new EventEmitter<any>();
    @Output() suggestionNotFound = new EventEmitter();

    @Input() type: T;
    @Input() params: ParamsByRequestType[typeof requestTypeByType[T]];

    constructor(
        focusMonitor: FocusMonitor,
        elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
        platform: Platform,
        autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective,
        private daDataService: DaDataService,
        private transloco: TranslocoService
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
        this.formControl.valueChanges
            .pipe(
                tap(() => (this.isOptionsLoading = true)),
                debounce(() => interval(300)),
                switchMap(this.getParams.bind(this))
            )
            .subscribe(
                suggestions => {
                    if (suggestions.length === 0) {
                        this.suggestionNotFound.emit();
                    }
                    this.options = (suggestions as C[]).map(s => this.getOption(s));
                    this.isOptionsLoading = false;
                },
                error => {
                    console.error(error);
                    this.errorOccurred.next(error);
                }
            );
    }

    optionSelectedHandler(e: MatAutocompleteSelectedEvent) {
        const idx = e.source.options.toArray().findIndex(option => option === e.option);
        this.optionSelected.next(this.options[idx].value);
    }

    private getParams() {
        const params: ParamsByRequestType[typeof requestTypeByType[T]] = { query: this.formControl.value as string };
        return this.daDataService.suggest(requestTypeByType[this.type], this.withSpecificParams(params));
    }

    private withSpecificParams(
        params: ParamsByRequestType[typeof requestTypeByType[T]]
    ): ParamsByRequestType[typeof requestTypeByType[T]] {
        switch (this.type) {
            // TODO: wait API fixes
            case 'address':
                const addressParams = params as AddressQuery;
                addressParams.restrictValue = false;
                addressParams.fromBound = 'Area';
                addressParams.toBound = 'House';
                return addressParams;
            case 'fmsUnit':
                const fmsUnitParams = params as FmsUnitQuery;
                fmsUnitParams.queryType = 'FullTextSearch';
                return fmsUnitParams;
            default:
                return params;
        }
    }

    private getOption(suggestion: C): Option<C> {
        return {
            header: (suggestion as any).value || '',
            description: this.getDescription(suggestion),
            value: suggestion
        };
    }

    private getDescription(suggestion: C): string {
        switch (this.type) {
            case 'bank':
                const { bic, correspondentAccount } = suggestion as BankContent;
                return [
                    bic && `${this.transloco.translate('bank.bic', null, 'dadata|scoped')}: ${bic || ''}`,
                    correspondentAccount &&
                        `${this.transloco.translate(
                            'bank.correspondentAccount',
                            null,
                            'dadata|scoped'
                        )}: ${correspondentAccount || ''}`
                ]
                    .filter(v => !!v)
                    .join(' ');
            case 'party':
                const { inn, ogrn, address } = suggestion as PartyContent;
                const innOGRN = [inn, ogrn].filter(v => !!v).join('/');
                return [innOGRN, address.value].filter(v => !!v).join(' ');
            default:
                return '';
        }
    }
}
