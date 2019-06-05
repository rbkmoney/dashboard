import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterContentInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material';

export type ToggleType = 'checkbox' | 'radio';

/**
 * Provider Expression that allows dsh-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DshButtonToggleGroupDirective),
    multi: true
};

let _uniqueIdCounter = 0;

export class DshButtonToggleChange {
    constructor(
        public source: DshButtonToggleComponent,
        public value: any
    ) {}
}

@Directive({
    selector: 'dsh-button-toggle-group, [dshButtonToggleGroup]',
    providers: [
        MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
        { provide: MatButtonToggleGroup, useExisting: DshButtonToggleGroupDirective }
    ],
    /* tslint:disable */
    host: {
        role: 'group',
        class: 'dsh-button-toggle-group',
        '[attr.aria-disabled]': 'disabled',
        '[class.dsh-button-toggle-vertical]': 'vertical'
    },
    /* tslint:enable */
    exportAs: 'matButtonToggleGroup'
})
export class DshButtonToggleGroupDirective implements ControlValueAccessor, OnInit, AfterContentInit {
    /** Child button toggle buttons. */
    @ContentChildren(forwardRef(() => DshButtonToggleComponent)) _buttonToggles: QueryList<DshButtonToggleComponent>;

    @Output() readonly change: EventEmitter<DshButtonToggleChange> = new EventEmitter<DshButtonToggleChange>();
    @Output() readonly valueChange = new EventEmitter<any>();

    private _vertical = false;
    private _multiple = false;
    private _disabled = false;
    private _selectionModel: SelectionModel<DshButtonToggleComponent>;
    private _name = `dsh-button-toggle-group-${_uniqueIdCounter++}`;

    private _rawValue: any;

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    _controlValueAccessorChangeFn: (value: any) => void = () => {};

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    _onTouched: () => any = () => {};

    /** `name` attribute for the underlying `input` element. */
    @Input()
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;

        if (this._buttonToggles) {
            this._buttonToggles.forEach(toggle => {
                toggle.name = this._name;
                toggle._markForCheck();
            });
        }
    }

    /** Whether the toggle group is vertical. */
    @Input()
    get vertical(): boolean {
        return this._vertical;
    }
    set vertical(value: boolean) {
        this._vertical = coerceBooleanProperty(value);
    }

    /** Value of the toggle group. */
    @Input()
    get value(): any {
        const selected = this._selectionModel ? this._selectionModel.selected : [];

        if (this.multiple) {
            return selected.map(toggle => toggle.value);
        }

        return selected[0] ? selected[0].value : undefined;
    }
    set value(newValue: any) {
        this._setSelectionByValue(newValue);
        this.valueChange.emit(this.value);
    }

    /** Selected button toggles in the group. */
    get selected() {
        const selected = this._selectionModel.selected;
        return this.multiple ? selected : selected[0] || null;
    }

    /** Whether multiple button toggles can be selected. */
    @Input()
    get multiple(): boolean {
        return this._multiple;
    }
    set multiple(value: boolean) {
        this._multiple = coerceBooleanProperty(value);
    }

    /** Whether multiple button toggle group is disabled. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);

        if (this._buttonToggles) {
            this._buttonToggles.forEach(toggle => toggle._markForCheck());
        }
    }

    constructor(private _changeDetector: ChangeDetectorRef) {}

    ngOnInit() {
        this._selectionModel = new SelectionModel<DshButtonToggleComponent>(this.multiple, undefined, false);
    }

    ngAfterContentInit() {
        this._selectionModel.select(...this._buttonToggles.filter(toggle => toggle.checked));
    }

    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    writeValue(value: any) {
        this.value = value;
        this._changeDetector.markForCheck();
    }

    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn: (value: any) => void) {
        this._controlValueAccessorChangeFn = fn;
    }

    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn: any) {
        this._onTouched = fn;
    }

    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** Dispatch change event with current selection and group value. */
    _emitChangeEvent(): void {
        const selected = this.selected;
        const source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
        const event = new DshButtonToggleChange(source, this.value);
        this._controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    }

    /**
     * Syncs a button toggle's selected state with the model value.
     * @param toggle Toggle to be synced.
     * @param select Whether the toggle should be selected.
     * @param isUserInput Whether the change was a result of a user interaction.
     * @param deferEvents Whether to defer emitting the change events.
     */
    _syncButtonToggle(toggle: DshButtonToggleComponent, select: boolean, isUserInput = false, deferEvents = false) {
        // Deselect the currently-selected toggle, if we're in single-selection
        // mode and the button being toggled isn't selected at the moment.
        if (!this.multiple && this.selected && !toggle.checked) {
            (this.selected as DshButtonToggleComponent).checked = false;
        }

        if (select) {
            this._selectionModel.select(toggle);
        } else {
            this._selectionModel.deselect(toggle);
        }

        // We need to defer in some cases in order to avoid "changed after checked errors", however
        // the side-effect is that we may end up updating the model value out of sequence in others
        // The `deferEvents` flag allows us to decide whether to do it on a case-by-case basis.
        if (deferEvents) {
            Promise.resolve(() => this._updateModelValue(isUserInput));
        } else {
            this._updateModelValue(isUserInput);
        }
    }

    /** Checks whether a button toggle is selected. */
    _isSelected(toggle: DshButtonToggleComponent) {
        return this._selectionModel.isSelected(toggle);
    }

    /** Determines whether a button toggle should be checked on init. */
    _isPrechecked(toggle: DshButtonToggleComponent) {
        if (typeof this._rawValue === 'undefined') {
            return false;
        }

        if (this.multiple && Array.isArray(this._rawValue)) {
            return this._rawValue.some(value => toggle.value != null && value === toggle.value);
        }

        return toggle.value === this._rawValue;
    }

    /** Updates the selection state of the toggles in the group based on a value. */
    private _setSelectionByValue(value: any | any[]) {
        this._rawValue = value;

        if (!this._buttonToggles) {
            return;
        }

        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw Error('Value must be an array in multiple-selection mode.');
            }

            this._clearSelection();
            value.forEach((currentValue: any) => this._selectValue(currentValue));
        } else {
            this._clearSelection();
            this._selectValue(value);
        }
    }

    /** Clears the selected toggles. */
    private _clearSelection() {
        this._selectionModel.clear();
        this._buttonToggles.forEach(toggle => (toggle.checked = false));
    }

    /** Selects a value if there's a toggle that corresponds to it. */
    private _selectValue(value: any) {
        const correspondingOption = this._buttonToggles.find(toggle => {
            return toggle.value != null && toggle.value === value;
        });

        if (correspondingOption) {
            correspondingOption.checked = true;
            this._selectionModel.select(correspondingOption);
        }
    }

    /** Syncs up the group's value with the model and emits the change event. */
    private _updateModelValue(isUserInput: boolean) {
        // Only emit the change event for user input.
        if (isUserInput) {
            this._emitChangeEvent();
        }

        // Note: we emit this one no matter whether it was a user interaction, because
        // it is used by Angular to sync up the two-way data binding.
        this.valueChange.emit(this.value);
    }
}

// Boilerplate for applying mixins to the DshButtonToggleComponent class.
/** @docs-private */
class MatButtonToggleBase {}
const _MatButtonToggleMixinBase: typeof MatButtonToggleBase = MatButtonToggleBase;

/** Single button inside of a toggle group. */
@Component({
    selector: 'dsh-button-toggle, [dshButtonToggle]',
    templateUrl: 'button-toggle.html',
    styleUrls: ['button-toggle.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'matButtonToggle',
    changeDetection: ChangeDetectionStrategy.OnPush,
    /* tslint:disable */
    host: {
        '[class.dsh-button-toggle-standalone]': '!buttonToggleGroup',
        '[class.dsh-button-toggle-checked]': 'checked',
        '[class.dsh-button-toggle-disabled]': 'disabled',
        class: 'dsh-button-toggle',
        // Always reset the tabindex to -1 so it doesn't conflict with the one on the `button`,
        // but can still receive focus from things like cdkFocusInitial.
        '[attr.tabindex]': '-1',
        '[attr.id]': 'id',
        '[attr.name]': 'null',
        '(focus)': 'focus()'
    }
    /* tslint:enable */
})
export class DshButtonToggleComponent extends _MatButtonToggleMixinBase implements OnInit, OnDestroy {
    private _isSingleSelector = false;
    private _checked = false;

    @Input('aria-label') ariaLabel: string;
    @Input('aria-labelledby') ariaLabelledby: string | null = null;
    @Input() id: string;
    @Input() name: string;
    @Input() value: any;
    @Input() tabIndex: number | null;
    @Input()
    get checked(): boolean {
        return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
    }
    set checked(value: boolean) {
        const newValue = coerceBooleanProperty(value);

        if (newValue !== this._checked) {
            this._checked = newValue;

            if (this.buttonToggleGroup) {
                this.buttonToggleGroup._syncButtonToggle(this, this._checked);
            }

            this._changeDetectorRef.markForCheck();
        }
    }
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    private _disabled = false;

    /** Event emitted when the group value changes. */
    @Output() readonly change: EventEmitter<DshButtonToggleChange> = new EventEmitter<DshButtonToggleChange>();

    @ViewChild('button') _buttonElement: ElementRef<HTMLButtonElement>;

    _type: ToggleType;
    /** The parent button toggle group (exclusive selection). Optional. */
    buttonToggleGroup: DshButtonToggleGroupDirective;

    /** Unique ID for the underlying `button` element. */
    get buttonId(): string {
        return `${this.id}-button`;
    }

    constructor(
        @Optional() toggleGroup: DshButtonToggleGroupDirective,
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _focusMonitor: FocusMonitor,
        // @breaking-change 8.0.0 `defaultTabIndex` to be made a required parameter.
        @Attribute('tabindex') defaultTabIndex: string
    ) {
        super();

        const parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
        this.buttonToggleGroup = toggleGroup;
    }

    ngOnInit() {
        this._isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
        this._type = this._isSingleSelector ? 'radio' : 'checkbox';
        this.id = this.id || `dsh-button-toggle-${_uniqueIdCounter++}`;

        if (this._isSingleSelector) {
            this.name = this.buttonToggleGroup.name;
        }

        if (this.buttonToggleGroup && this.buttonToggleGroup._isPrechecked(this)) {
            this.checked = true;
        }

        this._focusMonitor.monitor(this._elementRef, true);
    }

    ngOnDestroy() {
        const group = this.buttonToggleGroup;

        this._focusMonitor.stopMonitoring(this._elementRef);

        // Remove the toggle from the selection once it's destroyed. Needs to happen
        // on the next tick in order to avoid "changed after checked" errors.
        if (group && group._isSelected(this)) {
            group._syncButtonToggle(this, false, false, true);
        }
    }

    focus(): void {
        this._buttonElement.nativeElement.focus();
    }

    /** Checks the button toggle due to an interaction with the underlying native button. */
    _onButtonClick() {
        const newChecked = this._isSingleSelector ? true : !this._checked;

        if (newChecked !== this._checked) {
            this._checked = newChecked;
            if (this.buttonToggleGroup) {
                this.buttonToggleGroup._syncButtonToggle(this, this._checked, true);
                this.buttonToggleGroup._onTouched();
            }
        }
        // Emit a change event when it's the single selector
        this.change.emit(new DshButtonToggleChange(this, this.value));
    }

    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
