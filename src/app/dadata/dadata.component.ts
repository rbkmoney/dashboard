import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    Optional,
    Self,
    ViewChild,
    HostListener,
    OnInit,
    Output,
    EventEmitter,
    DoCheck
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher, CanUpdateErrorStateCtor, mixinErrorState } from '@angular/material';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatAutocompleteOrigin } from '@angular/material/autocomplete/typings/autocomplete-origin';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable, Subject, interval, Subscription } from 'rxjs';
import { map, startWith, takeUntil, switchMap, debounce, tap } from 'rxjs/operators';

import { DaDataService } from './dadata.service';
import { SuggestionType } from './model/type';
import { SuggestionData } from './model/suggestions';

interface Option<T extends SuggestionType> {
    header: string;
    description: string;
    value: SuggestionData<T>;
}

class InputBase {
    constructor(
        public _defaultErrorStateMatcher: ErrorStateMatcher,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public ngControl: NgControl
    ) {}
}
const MatInputMixinBase: CanUpdateErrorStateCtor & typeof InputBase = mixinErrorState(InputBase);

@Component({
    providers: [{ provide: MatFormFieldControl, useExisting: DaDataAutocompleteComponent }],
    selector: 'dsh-dadata-autocomplete',
    styleUrls: ['dadata.component.scss'],
    templateUrl: 'dadata.component.html'
})
export class DaDataAutocompleteComponent<T extends SuggestionType = any> extends MatInputMixinBase
    implements AfterViewInit, ControlValueAccessor, MatFormFieldControl<string>, OnDestroy, OnInit, DoCheck {
    static currentId = 0;
    static prefix = 'dsh-dadata-autocomplete';

    suggestions$: Observable<SuggestionData<T>[]>;
    options: Option<T>[];
    isOptionsLoading = false;

    @Output() optionSelected = new EventEmitter<SuggestionData<T>>();
    @Output() errorOccurred = new EventEmitter<any>();
    @Output() suggestionNotFound = new EventEmitter();

    @Input() type: T;
    @Input() count = 10;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get value(): string {
        return this.formControl.value;
    }
    set value(value: string) {
        this.formControl.setValue(value);
        this.stateChanges.next();
    }

    @HostBinding('attr.aria-describedby') describedBy = '';
    @HostBinding() id = `${DaDataAutocompleteComponent.prefix}-${++DaDataAutocompleteComponent.currentId}`;

    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    @ViewChild('input', { read: ElementRef, static: true })
    inputRef: ElementRef<HTMLInputElement>;

    autofilled = false;

    controlType = 'text';

    get empty(): boolean {
        return !this.formControl.value;
    }

    get focused(): boolean {
        return this._focused;
    }
    set focused(value: boolean) {
        this._focused = value;
        this.stateChanges.next();
    }

    formControl = new FormControl();
    stateChanges: Subject<void> = new Subject();
    autocompleteOrigin: MatAutocompleteOrigin;

    private _disabled = false;
    private _focused = false;
    private _placeholder = '';
    private _required = false;
    private destroy: Subject<void> = new Subject();
    private autofillSub = Subscription.EMPTY;
    private valueChangesSub = Subscription.EMPTY;
    private _onTouched: () => void;

    constructor(
        private focusMonitor: FocusMonitor,
        private elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
        private autofillMonitor: AutofillMonitor,
        private daDataService: DaDataService,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective
    ) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        if (this.ngControl !== null) {
            // Set the value accessor directly
            // (instead of providing NG_VALUE_ACCESSOR)
            // to avoid running into a circular import
            this.ngControl.valueAccessor = this;
        }
        this.valueChangesSub = this.formControl.valueChanges
            .pipe(
                tap(() => (this.isOptionsLoading = true)),
                debounce(() => interval(300)),
                switchMap(() =>
                    this.daDataService.getSuggestions(this.type, this.formControl.value, { count: this.count })
                )
            )
            .subscribe(
                suggestions => {
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

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngOnInit() {
        this.updateAutocompleteOrigin();
    }

    ngAfterViewInit(): void {
        this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
        });
        this.autofillSub = this.observeAutofill(this.inputRef)
            .pipe(takeUntil(this.destroy))
            .subscribe(autofilled => (this.autofilled = autofilled));
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
        this.stateChanges.complete();
        this.errorOccurred.complete();
        this.suggestionNotFound.complete();
        this.autofillSub.unsubscribe();
        this.valueChangesSub.unsubscribe();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.autofillMonitor.stopMonitoring(this.inputRef);
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.focusMonitor.focusVia(this.inputRef.nativeElement, 'mouse');
        }
    }

    @HostListener('focusout')
    onTouched(): void {
        this._onTouched();
    }

    updateAutocompleteOrigin() {
        this.autocompleteOrigin = {
            elementRef: new ElementRef(this.elementRef.nativeElement.parentElement.parentElement)
        };
    }

    registerOnChange(onChange: (value: string) => void): void {
        this.formControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe(onChange);
    }

    registerOnTouched(onTouched: () => void): void {
        this._onTouched = onTouched;
    }

    setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    setDisabledState(shouldDisable: boolean): void {
        if (shouldDisable) {
            this.formControl.disable();
        } else {
            this.formControl.enable();
        }

        this.disabled = shouldDisable;
    }

    writeValue(value: string): void {
        this.formControl.setValue(value, { emitEvent: false });
    }

    optionSelectedHandler(e: MatAutocompleteSelectedEvent) {
        const idx = e.source.options.toArray().findIndex(option => option === e.option);
        this.optionSelected.next(this.options[idx].value);
    }

    private observeAutofill(ref: ElementRef): Observable<boolean> {
        return this.autofillMonitor
            .monitor(ref)
            .pipe(map(event => event.isAutofilled))
            .pipe(startWith(false));
    }

    private getOptionParts(suggestion: SuggestionData<T>): Option<T> {
        switch (this.type) {
            case SuggestionType.party:
                const { data } = suggestion as SuggestionData<SuggestionType.party>;
                const innOGRN = data.inn && data.ogrn ? data.inn + '/' + data.ogrn : data.inn || data.ogrn || '';
                return {
                    header: suggestion.value,
                    description: (innOGRN ? innOGRN + ' ' : '') + data.address.value,
                    value: suggestion
                };
            default:
                return {
                    header: suggestion.value,
                    description: '',
                    value: suggestion
                };
        }
    }
}
