import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { instance, mock, verify, when } from 'ts-mockito';

import { FilterModule } from '@dsh/components/filters/filter';

import { QueryFilterComponent } from './query-filter.component';

describe('QueryFilterComponent', () => {
    let component: QueryFilterComponent;
    let fixture: ComponentFixture<QueryFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FilterModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                MatButtonModule,
                MatIconModule,
                TranslocoTestingModule.withLangs({
                    en: {
                        save: 'Save',
                        clear: 'Clear',
                    },
                }),
            ],
            declarations: [QueryFilterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QueryFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onOpened', () => {
        it('should update current query value with searchValue', () => {
            const spyOnQuery = spyOn(component.query$, 'next').and.callThrough();

            component.searchValue = 'mySearchValue';
            component.onOpened();

            expect(spyOnQuery).toHaveBeenCalledTimes(1);
            expect(spyOnQuery).toHaveBeenCalledWith('mySearchValue');
        });
    });

    describe('onInput', () => {
        let mockInputRef: ElementRef<HTMLInputElement>;
        let mockInput: HTMLInputElement;

        beforeEach(() => {
            mockInputRef = mock(ElementRef);
            mockInput = mock(HTMLInputElement);
        });

        beforeEach(() => {
            component.inputRef = instance(mockInputRef);

            when(mockInputRef.nativeElement).thenReturn(instance(mockInput));
        });

        it('should update query with input value', () => {
            const spyOnQuery = spyOn(component.query$, 'next').and.callThrough();

            when(mockInput.value).thenReturn('myValue');

            component.onInput();

            verify(mockInput.value).once();
            expect(spyOnQuery).toHaveBeenCalledTimes(1);
            expect(spyOnQuery).toHaveBeenCalledWith('myValue');
        });
    });

    describe('onClosed', () => {
        it('should call saveData', () => {
            const spyOnSaveData = spyOn(component, 'saveData').and.callThrough();

            component.onClosed();

            expect(spyOnSaveData).toHaveBeenCalledTimes(1);
        });

        it('should not close filter', () => {
            const spyOnClose = spyOn(component.filter, 'close').and.callThrough();

            component.onClosed();

            expect(spyOnClose).not.toHaveBeenCalled();
        });
    });

    describe('onSave', () => {
        it('should call saveData', () => {
            const spyOnSaveData = spyOn(component, 'saveData').and.callThrough();

            component.onSave();

            expect(spyOnSaveData).toHaveBeenCalledTimes(1);
        });

        it('should close filter', () => {
            const spyOnClose = spyOn(component.filter, 'close').and.callThrough();

            component.onSave();

            expect(spyOnClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('onClear', () => {
        it('should tick empty query value', () => {
            component.searchValue = 'my value';
            component.onOpened();

            const spyOnQuery = spyOn(component.query$, 'next').and.callThrough();

            component.onClear();

            expect(spyOnQuery).toHaveBeenCalledTimes(1);
            expect(spyOnQuery).toHaveBeenCalledWith('');
        });
    });

    describe('saveData', () => {
        it('should update searchValue', () => {
            const prevSearchValue = component.searchValue;
            const newSearchValue = 'mySearchData';

            component.query$.next(newSearchValue);
            component.saveData();

            expect(component.searchValue).not.toBe(prevSearchValue);
            expect(component.searchValue).toBe(newSearchValue);
        });

        it('should format titleLabel using search value', () => {
            component.badgeTitle = 'MyTitle';
            component.searchValue = 'mySearch';
            component.onOpened();

            component.saveData();

            expect(component.titleLabel).toBe(`MyTitle: mySearch`);
        });

        it('should format titleLabel with empty search value', () => {
            component.badgeTitle = 'MyTitle';
            component.searchValue = '';
            component.onOpened();

            component.saveData();

            expect(component.titleLabel).toBe(`MyTitle`);
        });

        it('should set active status if search value is not emtpy', () => {
            component.searchValue = 'mySearch';
            component.onOpened();

            component.saveData();

            expect(component.isActive).toBe(true);
        });

        it('should set inactive status if search value is empty', () => {
            component.searchValue = '';
            component.onOpened();

            component.saveData();

            expect(component.isActive).toBe(false);
        });

        it('should emit filterChanged with search value', () => {
            const spyOnFilterChanged = spyOn(component.filterChanged, 'emit').and.callThrough();

            component.searchValue = 'mySearch';
            component.onOpened();

            component.saveData();

            expect(spyOnFilterChanged).toHaveBeenCalledTimes(1);
            expect(spyOnFilterChanged).toHaveBeenCalledWith('mySearch');
        });

        it('should emit filterChanged with empty search value', () => {
            const spyOnFilterChanged = spyOn(component.filterChanged, 'emit').and.callThrough();

            component.searchValue = '';
            component.onOpened();

            component.saveData();

            expect(spyOnFilterChanged).toHaveBeenCalledTimes(1);
            expect(spyOnFilterChanged).toHaveBeenCalledWith('');
        });
    });
});
