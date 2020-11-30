import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import { map, startWith } from 'rxjs/operators';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

// TODO: make this constants as a dependency
const ITEM_SIZE = 48;
const LIST_MULTIPLIER = 5;

@UntilDestroy()
@Component({
    selector: 'dsh-autocomplete-virtual-scroll',
    templateUrl: './autocomplete-virtual-scroll.component.html',
    styleUrls: ['./autocomplete-virtual-scroll.component.scss'],
})
export class AutocompleteVirtualScrollComponent implements OnInit {
    @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport;

    @Input() label: string;
    @Input() control: FormControl;
    @Input() optionsList: BaseOption[];
    @Input() placeholder = 'Search ...';
    @Input() hint: string;

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

    ngOnInit(): void {
        this.innerControl.valueChanges
            .pipe(
                startWith(''),
                map((search: string) => search.toLowerCase()),
                untilDestroyed(this)
            )
            .subscribe((search: string) => {
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
            });
    }

    panelOpened() {
        if (!isNil(this.viewport)) {
            this.viewport.checkViewportSize();
        }
    }

    getErrorMessage(): string {
        if (isEmpty(this.control.errors)) {
            return '';
        }

        const [error] = Object.entries<string | string[] | null>(this.control.errors).map(
            ([_, value]: [string, string | string[] | null]) => value
        );
        const errorMessage = Array.isArray(error) ? error[0] : error;
        return isNil(errorMessage) ? '' : errorMessage;
    }

    onSelectionChanged(option: BaseOption): void {
        this.control.setValue(option);
    }
}
