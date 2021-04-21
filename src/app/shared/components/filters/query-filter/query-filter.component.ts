import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatInput } from '@angular/material/input';
import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

import { FilterComponent } from '@dsh/components/filters/filter';

const DEFAULT_LABEL = 'Name';

@Component({
    selector: 'dsh-query-filter',
    templateUrl: './query-filter.component.html',
    styleUrls: ['./query-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryFilterComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild(FilterComponent, { static: true }) filter: FilterComponent;
    @ViewChild(MatInput, { read: ElementRef, static: true }) inputRef: ElementRef;

    get input(): HTMLInputElement {
        if (isNil(this.inputRef)) {
            throw new Error(`Cannot get input from not initialized template`);
        }
        return this.inputRef.nativeElement;
    }

    @Input()
    get searchLabel(): string {
        return this.innerSearchLabel;
    }
    set searchLabel(value: string | undefined) {
        if (isNil(value) || isEmpty(value)) {
            return;
        }
        this.innerSearchLabel = value;
    }

    @Input()
    get badgeTitle(): string {
        return this.innerBadgeTitle;
    }
    set badgeTitle(value: string | undefined) {
        if (isNil(value) || isEmpty(value)) {
            return;
        }
        this.innerBadgeTitle = value;
    }

    @Input()
    get searchValue(): string {
        return this.innerSearchValue;
    }
    set searchValue(value: string | undefined) {
        if (isNil(value) || isEmpty(value)) {
            return;
        }
        this.innerSearchValue = value;
    }

    @Output() destroy = new EventEmitter<void>();
    @Output() filterChanged = new EventEmitter<string>();

    titleLabel: string;
    isActive = false;
    query$ = new BehaviorSubject<string>('');

    protected changes$ = new ReplaySubject<SimpleChanges>(1);
    private innerSearchLabel: string = DEFAULT_LABEL;
    private innerBadgeTitle = '';
    private innerSearchValue = '';

    ngOnInit(): void {
        this.initListeners();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.changes$.next(changes);
    }

    ngOnDestroy(): void {
        this.destroy.emit();
    }

    onOpened(): void {
        this.updateQuery(this.searchValue);
    }

    onInput(): void {
        this.updateQuery(this.input.value);
    }

    onClosed(): void {
        this.saveData();
    }

    onSave(): void {
        this.filter.close();
    }

    onClear(): void {
        this.clearQuery();
    }

    saveData(): void {
        this.innerSearchValue = this.query$.value;
        this.updateTitleValue();
        this.updateActiveStatus();
        this.filterChanged.emit(this.searchValue);
    }

    private initListeners(): void {
        const titleChanges$ = this.changes$.pipe(
            map((changes: SimpleChanges) => changes.title),
            filter(Boolean),
            map((change: SimpleChange) => change.currentValue),
            filter(Boolean),
            map((value: string) => value)
        );

        const labelChanges$ = this.changes$.pipe(
            map((changes: SimpleChanges) => changes.label),
            filter(Boolean),
            map((change: SimpleChange) => change.currentValue),
            filter(Boolean),
            map((value: string) => value)
        );

        const searchValueChanges$ = this.changes$.pipe(
            map((changes: SimpleChanges) => changes.searchValue),
            filter(Boolean),
            map((change: SimpleChange) => change.currentValue),
            filter(Boolean),
            map((value: string) => value)
        );

        titleChanges$.pipe(startWith<string, null>(null), takeUntil(this.destroy)).subscribe(() => {
            this.updateTitleValue();
        });

        labelChanges$.pipe(startWith(this.searchLabel), takeUntil(this.destroy)).subscribe(() => {
            if (isEmpty(this.badgeTitle)) {
                this.badgeTitle = this.searchLabel;
                this.updateTitleValue();
            }
        });

        searchValueChanges$.pipe(startWith(''), takeUntil(this.destroy)).subscribe(() => {
            this.updateTitleValue();
            this.updateActiveStatus();
        });
    }

    private updateTitleValue(): void {
        this.titleLabel = isEmpty(this.searchValue) ? this.badgeTitle : `${this.badgeTitle}: ${this.searchValue}`;
    }

    private updateActiveStatus(): void {
        this.isActive = !isEmpty(this.searchValue);
    }

    private updateQuery(value: string): void {
        this.query$.next(value);
    }

    private clearQuery(): void {
        this.updateQuery('');
    }
}
