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
    OnInit
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { MatAutocompleteOrigin } from '@angular/material/autocomplete/typings/autocomplete-origin';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { map, startWith, takeUntil, switchMap } from 'rxjs/operators';

import { DaDataService } from './dadata.service';
import { SuggestionType } from './model/type';
import { Suggestion, PartySuggestionData } from './model/suggestions';

const PREFIX = 'dsh-dadata-autocomplete';

@Component({
    providers: [{ provide: MatFormFieldControl, useExisting: DaDataAutocompleteComponent }],
    selector: 'dsh-dadata-autocomplete',
    styleUrls: ['dadata.component.scss'],
    templateUrl: 'dadata.component.html'
})
export class DaDataAutocompleteComponent
    implements AfterViewInit, ControlValueAccessor, MatFormFieldControl<string>, OnDestroy, OnInit {
    static currentId = 0;

    suggestions: Suggestion<PartySuggestionData>[];
    private suggestionsSubscription: Subscription;
    private suggestionsCleanSubscription: Subscription;

    private _disabled = false;
    private _focused = false;
    private _placeholder = '';
    private _required = false;
    private destroy: Subject<void> = new Subject();
    private _onTouched: () => void;

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

    @HostBinding('attr.aria-describedby')
    describedBy = '';

    @HostBinding()
    id = `${PREFIX}-${++DaDataAutocompleteComponent.currentId}`;

    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    @ViewChild('input', { read: ElementRef })
    inputRef: ElementRef<HTMLInputElement>;

    autofilled = false;

    controlType = 'text';

    get empty(): boolean {
        return !this.formControl.value;
    }

    get errorState(): boolean {
        return this.ngControl.control === null ? false : !!this.ngControl.control.errors;
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

    constructor(
        private focusMonitor: FocusMonitor,
        private elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
        private autofillMonitor: AutofillMonitor,
        private daDataService: DaDataService
    ) {
        if (this.ngControl !== null) {
            // Set the value accessor directly
            // (instead of providing NG_VALUE_ACCESSOR)
            // to avoid running into a circular import
            this.ngControl.valueAccessor = this;
        }
        this.formControl.valueChanges.subscribe(() => {
            this.updateSuggestions();
        });
    }

    ngOnInit() {
        this.updateAutocompleteOrigin();
    }

    ngAfterViewInit(): void {
        this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
        });
        this.observeAutofill(this.inputRef)
            .pipe(takeUntil(this.destroy))
            .subscribe(autofilled => (this.autofilled = autofilled));
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
        this.stateChanges.complete();
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

    updateSuggestions() {
        if (this.suggestionsSubscription) {
            this.suggestionsSubscription.unsubscribe();
            delete this.suggestionsSubscription;
        }
        if (!this.suggestionsCleanSubscription) {
            this.suggestionsCleanSubscription = timer(333).subscribe(() => {
                if (this.suggestionsSubscription) {
                    delete this.suggestions;
                }
                delete this.suggestionsCleanSubscription;
            });
        }
        this.suggestionsSubscription = timer(200)
            .pipe(switchMap(() => this.daDataService.getSuggestions(SuggestionType.party, this.formControl.value)))
            .subscribe(suggestions => {
                this.suggestions = suggestions;
                delete this.suggestionsSubscription;
            });
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

    private observeAutofill(ref: ElementRef): Observable<boolean> {
        return this.autofillMonitor
            .monitor(ref)
            .pipe(map(event => event.isAutofilled))
            .pipe(startWith(false));
    }
}
