import { FocusMonitor } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Component, ElementRef, Input, Optional, Self, Output, EventEmitter } from '@angular/core';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Observable, interval } from 'rxjs';
import { switchMap, debounce, tap } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';

import { DaDataRequest, PartyContent, AddressQuery } from '../api-codegen/aggr-proxy';
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
    @Input() count = 10;
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
        this.formControl.valueChanges
            .pipe(
                tap(() => (this.isOptionsLoading = true)),
                debounce(() => interval(300)),
                switchMap(() => {
                    const params: ParamsByRequestType[typeof requestTypeByType[T]] = {
                        query: this.formControl.value as string,
                        count: this.count
                    };
                    switch (this.type) {
                        // TODO: wait API fixes
                        case 'address':
                            const addressParams = params as AddressQuery;
                            addressParams.restrictValue = false;
                            addressParams.fromBound = 'Area';
                            addressParams.toBound = 'House';
                            break;
                    }
                    return this.daDataService.suggest(requestTypeByType[this.type], {
                        ...params,
                        ...(this.params || {})
                    });
                })
            )
            .subscribe(
                suggestions => {
                    if (suggestions.length === 0) {
                        this.suggestionNotFound.emit();
                    }
                    this.options = (suggestions as C[]).map(s => this.getOptionParts(s));
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

    private getOptionParts(suggestion: C): Option<C> {
        let description: string;
        switch (this.type) {
            case 'party':
                const { inn, ogrn, address } = suggestion as PartyContent;
                const innOGRN = [inn, ogrn].filter(v => !!v).join('/');
                description = [innOGRN, address.value].filter(v => !!v).join(' ');
                break;
        }
        return {
            header: (suggestion as any).value || '',
            description: description || '',
            value: suggestion
        };
    }
}
