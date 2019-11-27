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

import { DaDataRequest, PartyContent } from '../api-codegen/aggr-proxy';
import { DaDataService, Suggestion } from '../api';
import { type } from './type';
import { CustomFormControl } from '../form-controls';

interface Option {
    header: string;
    description: string;
    value: Suggestion;
}

const ReqType = DaDataRequest.DaDataRequestTypeEnum;

const requestTypeByType: { [name in typeof type[number]]: DaDataRequest.DaDataRequestTypeEnum } = {
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
export class DaDataAutocompleteComponent extends CustomFormControl {
    suggestions$: Observable<Suggestion[]>;
    options: Option[];
    isOptionsLoading = false;

    @Output() optionSelected = new EventEmitter<Suggestion>();
    @Output() errorOccurred = new EventEmitter<any>();
    @Output() suggestionNotFound = new EventEmitter();

    @Input() type: typeof type[number];
    @Input() count = 10;

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
                switchMap(() =>
                    this.daDataService.suggest(requestTypeByType[this.type], {
                        query: this.formControl.value,
                        count: this.count
                    })
                )
            )
            .subscribe(
                ({ suggestions }) => {
                    if (suggestions.length === 0) {
                        this.suggestionNotFound.emit();
                    }
                    this.options = suggestions.map(s => this.getOptionParts(s));
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

    private getOptionParts(suggestion: Suggestion): Option {
        let description: string;
        switch (this.type) {
            case 'party':
                const { inn, ogrn, address } = suggestion as PartyContent;
                const innOGRN = [inn, ogrn].filter(v => !!v).join('/');
                description = [innOGRN, address.value].filter(v => !!v).join(' ');
                break;
        }
        return {
            header: suggestion.value || '',
            description: description || '',
            value: suggestion
        };
    }
}
