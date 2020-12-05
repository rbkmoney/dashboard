import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Inject, Input, NgZone, OnChanges, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { ComponentChange, ComponentChanges } from '../../../../../type-utils';
import { VIRTUAL_SCROLL_ITEM_SIZE, VIRTUAL_SCROLL_LIST_MULTIPLIER } from '../tokens';

const ITEM_SIZE = 48;
const LIST_MULTIPLIER = 5;
const DEFAULT_PLACEHOLDER = 'Search ...';

@UntilDestroy()
@Component({
    selector: 'dsh-autocomplete-virtual-scroll',
    templateUrl: './autocomplete-virtual-scroll.component.html',
    styleUrls: ['./autocomplete-virtual-scroll.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteVirtualScrollComponent implements OnInit, OnChanges {
    @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport;
    @ViewChild(MatAutocompleteTrigger, { static: true }) trigger: MatAutocompleteTrigger;
    @ViewChild(MatAutocomplete, { static: true }) autocomplete: MatAutocomplete;

    @Input() label: string;
    @Input() control: FormControl;
    @Input() optionsList: BaseOption[];
    @Input() hint: string;
    @Input() scrollableWindow: HTMLElement;
    @Input() required: boolean;

    @Input()
    get placeholder(): string {
        return this.innerPlaceholder;
    }
    set placeholder(value: string | undefined) {
        if (isNil(value)) {
            return;
        }
        this.innerPlaceholder = value;
    }

    filteredOptions: BaseOption[];
    searchControl = new FormControl();

    get itemSize(): number {
        if (isNil(this.innerItemSize)) {
            return ITEM_SIZE;
        }
        return this.innerItemSize;
    }
    get listMultiplier(): number {
        if (isNil(this.innerListMultiplier)) {
            return LIST_MULTIPLIER;
        }
        return this.innerListMultiplier;
    }

    get listSize(): number {
        if (isNil(this.filteredOptions)) {
            return 0;
        }

        const length = this.filteredOptions.length;

        if (length >= this.listMultiplier) {
            return this.listMultiplier * this.itemSize;
        }

        return length * this.itemSize;
    }

    private scrollableElement: HTMLElement;
    private innerPlaceholder = DEFAULT_PLACEHOLDER;

    constructor(
        private zone: NgZone,
        @Optional() @Inject(VIRTUAL_SCROLL_LIST_MULTIPLIER)
        private innerListMultiplier: number,
        @Optional() @Inject(VIRTUAL_SCROLL_ITEM_SIZE)
        private innerItemSize: number
    ) {}

    ngOnInit(): void {
        this.initControls();
    }

    ngOnChanges(changes: ComponentChanges<AutocompleteVirtualScrollComponent>): void {
        if (!isNil(changes.scrollableWindow)) {
            this.initScrollableClose(changes.scrollableWindow);
        }
    }

    panelOpened(): void {
        if (!isNil(this.viewport)) {
            this.viewport.checkViewportSize();
        }
    }

    getErrorMessage(): string {
        if (isEmpty(this.control.errors)) {
            return '';
        }

        const [error] = Object.entries<string | string[] | null>(this.control.errors)
            .map(([, value]: [string, string | string[] | null]) => value)
            .filter(Boolean);
        const errorMessage = Array.isArray(error) ? error[0] : error;
        return isNil(errorMessage) ? '' : errorMessage;
    }

    selectionChanged(option: BaseOption): void {
        this.control.setValue(option);
    }

    clearValue(): void {
        this.control.setValue(null);
        this.searchControl.setValue('');
        // need to make update after cycle was completed once
        setTimeout(() => {
            this.openPanel();
        }, 0);
    }

    private initControls(): void {
        this.searchControl.valueChanges
            .pipe(
                map((search: string) => search.toLowerCase()),
                untilDestroyed(this)
            )
            .subscribe((search: string) => {
                this.filterOptions(search);
            });

        const initValue = isObject(this.control.value) ? this.control.value.label : '';
        this.searchControl.setValue(initValue);
    }

    private initScrollableClose(change: ComponentChange<AutocompleteVirtualScrollComponent, 'scrollableWindow'>): void {
        if (isNil(change.currentValue) || !isNil(this.scrollableElement)) {
            return;
        }

        this.scrollableElement = change.currentValue;
        this.zone.runOutsideAngular(() => {
            fromEvent(this.scrollableWindow, 'scroll')
                .pipe(untilDestroyed(this))
                .subscribe(() => {
                    this.closePanel();
                });
        });
    }

    private openPanel(): void {
        if (!this.autocomplete.isOpen) {
            this.trigger.openPanel();
        }
    }

    private closePanel(): void {
        if (this.autocomplete.isOpen) {
            this.trigger.closePanel();
        }
    }

    private filterOptions(search: string): void {
        this.filteredOptions = this.optionsList
            .filter(({ label }: BaseOption) => label.toLowerCase().includes(search))
            .map((option: BaseOption) => {
                return {
                    ...option,
                    indexOf: option.label.toLowerCase().indexOf(search),
                };
            })
            .sort(({ indexOf: aIndex }, { indexOf: bIndex }) => {
                return aIndex >= bIndex ? 1 : -1;
            })
            .map(({ id, label }) => ({ id, label }));
    }
}
