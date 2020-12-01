import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, NgZone, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { ComponentChange, ComponentChanges } from '../../../../../type-utils';

// TODO: make this constants as a dependency
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
    innerControl = new FormControl();

    itemSize: number = ITEM_SIZE;
    listMultiplier: number = LIST_MULTIPLIER;

    get listSize(): number {
        if (isNil(this.filteredOptions)) {
            return 0;
        }

        const length = this.filteredOptions.length;

        if (length >= LIST_MULTIPLIER) {
            return LIST_MULTIPLIER * ITEM_SIZE;
        }

        return length * ITEM_SIZE;
    }

    private scrollableElement: HTMLElement;
    private innerPlaceholder = DEFAULT_PLACEHOLDER;

    constructor(private zone: NgZone) {}

    ngOnInit(): void {
        this.innerControl.valueChanges
            .pipe(
                startWith(''),
                map((search: string) => search.toLowerCase()),
                untilDestroyed(this)
            )
            .subscribe((search: string) => {
                this.filterOptions(search);
            });
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

        const [error] = Object.entries<string | string[] | null>(this.control.errors).map(
            ([, value]: [string, string | string[] | null]) => value
        );
        const errorMessage = Array.isArray(error) ? error[0] : error;
        return isNil(errorMessage) ? '' : errorMessage;
    }

    selectionChanged(option: BaseOption): void {
        this.control.setValue(option);
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
                    if (this.autocomplete.isOpen) {
                        this.trigger.closePanel();
                    }
                });
        });
    }

    private filterOptions(search: string): void {
        this.filteredOptions = this.optionsList
            .filter(({ label }: BaseOption) => label.toLowerCase().includes(search))
            .map((option: BaseOption) => {
                return {
                    ...option,
                    indexOf: option.label.indexOf(search),
                };
            })
            .sort(({ indexOf: aIndex }, { indexOf: bIndex }) => {
                return aIndex > bIndex ? 1 : -1;
            })
            .map(({ id, label }) => ({ id, label }));
    }
}
