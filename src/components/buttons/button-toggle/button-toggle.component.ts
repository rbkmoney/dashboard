import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { CanDisableRippleCtor, mixinDisableRipple } from '@angular/material/core';

export type ToggleType = 'checkbox' | 'radio';

/**
 * Provider Expression that allows dsh-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const DSH_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonToggleGroupDirective),
    multi: true,
};

let _uniqueIdCounter = 0;

export class DshButtonToggleChange {
    constructor(public source: ButtonToggleComponent, public value: any) {}
}

@Directive({
    selector: 'dsh-button-toggle-group, [dshButtonToggleGroup]',
    providers: [
        DSH_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
        { provide: MatButtonToggleGroup, useExisting: ButtonToggleGroupDirective },
    ],
    exportAs: 'dshButtonToggleGroup',
})
export class ButtonToggleGroupDirective implements ControlValueAccessor, OnInit, AfterContentInit {
    /* Child button toggle buttons. */
    @ContentChildren(forwardRef(() => ButtonToggleComponent)) _buttonToggles: QueryList<ButtonToggleComponent>;

    @HostBinding('class.dsh-button-toggle-group') groupClass = true;
    @HostBinding('attr.role') role = true;

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() readonly change: EventEmitter<DshButtonToggleChange> = new EventEmitter<DshButtonToggleChange>();
    @Output() readonly valueChange = new EventEmitter<any>();

    private _vertical = false;
    private _multiple = false;
    private _disabled = false;
    private _selectionModel: SelectionModel<ButtonToggleComponent>;
    private _name = `dsh-button-toggle-group-${(_uniqueIdCounter += 1)}`;

    private _rawValue: any;

    /** `name` attribute for the underlying `input` element. */
    @Input()
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;

        if (this._buttonToggles) {
            this._buttonToggles.forEach((toggle) => {
                toggle.name = this._name;
                toggle._markForCheck();
            });
        }
    }

    /** Whether the toggle group is vertical. */
    @HostBinding('class.dsh-button-toggle-vertical')
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
            return selected.map((toggle) => toggle.value);
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
            this._buttonToggles.forEach((toggle) => toggle._markForCheck());
        }
    }

    constructor(private _changeDetector: ChangeDetectorRef) {}

    ngOnInit() {
        this._selectionModel = new SelectionModel<ButtonToggleComponent>(this.multiple, undefined, false);
    }

    ngAfterContentInit() {
        this._selectionModel.select(...this._buttonToggles.filter((toggle) => toggle.checked));
    }

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _controlValueAccessorChangeFn: (value: any) => void = () => {};

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _onTouched: () => any = () => {};

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
    _syncButtonToggle(toggle: ButtonToggleComponent, select: boolean, isUserInput = false, deferEvents = false) {
        // Deselect the currently-selected toggle, if we're in single-selection
        // mode and the button being toggled isn't selected at the moment.
        if (!this.multiple && this.selected && !toggle.checked) {
            (this.selected as ButtonToggleComponent).checked = false;
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
    _isSelected(toggle: ButtonToggleComponent) {
        return this._selectionModel.isSelected(toggle);
    }

    /** Determines whether a button toggle should be checked on init. */
    _isPrechecked(toggle: ButtonToggleComponent) {
        if (typeof this._rawValue === 'undefined') {
            return false;
        }

        if (this.multiple && Array.isArray(this._rawValue)) {
            return this._rawValue.some((value) => toggle.value != null && value === toggle.value);
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
        this._buttonToggles.forEach((toggle) => (toggle.checked = false));
    }

    /** Selects a value if there's a toggle that corresponds to it. */
    private _selectValue(value: any) {
        const correspondingOption = this._buttonToggles.find((toggle) => {
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

// Boilerplate for applying mixins to the MatButtonToggle class.
/** @docs-private */
class MatButtonToggleBase {}
// eslint-disable-next-line @typescript-eslint/naming-convention
const _MatButtonToggleMixinBase: CanDisableRippleCtor & typeof MatButtonToggleBase =
    mixinDisableRipple(MatButtonToggleBase);

/** Single button inside of a toggle group. */
@Component({
    selector: 'dsh-button-toggle, [dshButtonToggle]',
    templateUrl: 'button-toggle.component.html',
    styleUrls: ['button-toggle.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'dshButtonToggle',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonToggleComponent extends _MatButtonToggleMixinBase implements OnInit, OnDestroy {
    private _isSingleSelector = false;
    private _checked = false;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input('aria-label')
    ariaLabel: string;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input('aria-labelledby')
    ariaLabelledby: string = null;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input()
    value: any;

    @HostBinding('class.dsh-button-toggle-checked')
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

    @HostBinding('attr.disabled')
    get attrDisabled() {
        return this.disabled ? 'disabled' : null;
    }

    @HostBinding('class.dsh-button-toggle-disabled')
    @Input()
    get disabled(): boolean {
        return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    private _disabled = false;

    @HostBinding('class.dsh-button-toggle-standalone')
    get isButtonToggleGroup() {
        return !this.buttonToggleGroup;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @HostBinding('class.dsh-button-toggle')
    toggleClass = true;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @HostBinding('attr.id')
    @Input()
    id: string;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @HostBinding('attr.name')
    @Input()
    name: string;

    /** Event emitted when the group value changes. */
    // eslint-disable-next-line @angular-eslint/no-output-native, @typescript-eslint/member-ordering
    @Output() readonly change: EventEmitter<DshButtonToggleChange> = new EventEmitter<DshButtonToggleChange>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('button', { static: true })
    _buttonElement: ElementRef<HTMLButtonElement>;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    _type: ToggleType;
    /** The parent button toggle group (exclusive selection). Optional. */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    buttonToggleGroup: ButtonToggleGroupDirective;

    /** Unique ID for the underlying `button` element. */
    get buttonId(): string {
        return `${this.id}-button`;
    }

    constructor(
        @Optional() toggleGroup: ButtonToggleGroupDirective,
        private _changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _focusMonitor: FocusMonitor
    ) {
        super();

        this.buttonToggleGroup = toggleGroup;
    }

    @HostListener('focus')
    focus(): void {
        this._buttonElement.nativeElement.focus();
    }

    ngOnInit() {
        this._isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
        this._type = this._isSingleSelector ? 'radio' : 'checkbox';
        this.id = this.id || `dsh-button-toggle-${(_uniqueIdCounter += 1)}`;

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
