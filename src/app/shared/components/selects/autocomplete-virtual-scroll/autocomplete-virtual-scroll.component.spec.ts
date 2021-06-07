import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject, Subscription } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { VIRTUAL_SCROLL_ITEM_SIZE, VIRTUAL_SCROLL_LIST_MULTIPLIER } from '@dsh/app/shared/components';

import { AutocompleteVirtualScrollComponent } from './autocomplete-virtual-scroll.component';

async function makeTestingModule(config?: TestModuleMetadata) {
    await TestBed.configureTestingModule({
        imports: [
            NoopAnimationsModule,
            MatAutocompleteModule,
            MatFormFieldModule,
            ScrollingModule,
            MatInputModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatIconModule,
        ],
        declarations: [AutocompleteVirtualScrollComponent],
        ...config,
    })
        .overrideComponent(AutocompleteVirtualScrollComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default,
            },
        })
        .compileComponents();
}

describe('AutocompleteVirtualScrollComponent', () => {
    let component: AutocompleteVirtualScrollComponent;
    let fixture: ComponentFixture<AutocompleteVirtualScrollComponent>;
    let mockCdkVirtualScrollViewport: CdkVirtualScrollViewport;
    let mockMatAutocompleteTrigger: MatAutocompleteTrigger;
    let mockMatAutocomplete: MatAutocomplete;
    let mockHTMLElement: HTMLElement;

    async function initDefaultComponent() {
        await makeTestingModule();
        fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
        component = fixture.componentInstance;

        component.optionsList = [];
        component.control = new FormControl(null);

        fixture.detectChanges();
    }

    beforeEach(() => {
        mockCdkVirtualScrollViewport = mock(CdkVirtualScrollViewport);
        mockMatAutocompleteTrigger = mock(MatAutocompleteTrigger);
        mockMatAutocomplete = mock(MatAutocomplete);
        mockHTMLElement = mock(HTMLElement);
    });

    describe('creation', () => {
        beforeEach(async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;
        });

        it('should create', () => {
            component.optionsList = [];
            component.control = new FormControl(null);
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    describe('itemSize', () => {
        it(`should use default value if item size wasn't provided`, async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            expect(component.itemSize).toBe(48);
        });

        it('should use provided value if item size was provided', async () => {
            await makeTestingModule({
                providers: [
                    {
                        provide: VIRTUAL_SCROLL_ITEM_SIZE,
                        useValue: 20,
                    },
                ],
            });
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            expect(component.itemSize).toBe(20);
        });
    });

    describe('listMultiplier', () => {
        it(`should use default value if list multiplier wasn't provided`, async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            expect(component.listMultiplier).toBe(5);
        });

        it('should use provided value if list multiplier was provided', async () => {
            await makeTestingModule({
                providers: [
                    {
                        provide: VIRTUAL_SCROLL_LIST_MULTIPLIER,
                        useValue: 10,
                    },
                ],
            });
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            expect(component.listMultiplier).toBe(10);
        });
    });

    describe('listSize', () => {
        beforeEach(async () => {
            await makeTestingModule({
                providers: [
                    {
                        provide: VIRTUAL_SCROLL_ITEM_SIZE,
                        useValue: 10,
                    },
                    {
                        provide: VIRTUAL_SCROLL_LIST_MULTIPLIER,
                        useValue: 5,
                    },
                ],
            });
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;
        });

        it(`should return zero if list doesn't exist`, () => {
            component.filteredOptions = undefined;
            expect(component.listSize).toBe(0);
        });

        it(`should return zero if list is empty`, () => {
            component.filteredOptions = [];
            expect(component.listSize).toBe(0);
        });

        it(`should return list multiplier multiplied on items size if list bigger than list multiplier`, () => {
            component.filteredOptions = new Array(6).fill(null).map((_: null, index: number) => {
                return {
                    id: index,
                    label: `name_${index}`,
                };
            });
            expect(component.listSize).toBe(50);
        });

        it(`should return list length multiplied on items size if list smaller or equal to list multiplier`, () => {
            component.filteredOptions = new Array(5).fill(null).map((_: null, index: number) => {
                return {
                    id: index,
                    label: `name_${index}`,
                };
            });
            expect(component.listSize).toBe(50);

            component.filteredOptions = new Array(2).fill(null).map((_: null, index: number) => {
                return {
                    id: index,
                    label: `name_${index}`,
                };
            });
            expect(component.listSize).toBe(20);
        });
    });

    describe('ngOnInit', () => {
        it('should init search control value using external control label value', async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            component.optionsList = [];
            component.control = new FormControl({
                id: 'id',
                label: 'MyLabel',
            });

            fixture.detectChanges();

            expect(component.searchControl.value).toBe('MyLabel');
        });

        it(`should init search control with empty string if external control doesn't contain base option value`, async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            component.optionsList = [];
            component.control = new FormControl(null);

            fixture.detectChanges();

            expect(component.searchControl.value).toBe('');
        });

        it('should add search listener that filter optionsList using search by label and filter using more relevant value first', async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            component.optionsList = [
                ...new Array(5).fill(null).map((_: null, index: number) => {
                    return {
                        id: index,
                        label: `name_${index}`,
                    };
                }),
                {
                    id: 5,
                    label: 'test_1',
                },
                {
                    id: 6,
                    label: 'JustTest_2',
                },
                {
                    id: 7,
                    label: 'my_test',
                },
            ];
            component.control = new FormControl(null);

            fixture.detectChanges();

            component.searchControl.setValue('test');

            expect(component.filteredOptions).toEqual([
                {
                    id: 5,
                    label: 'test_1',
                },
                {
                    id: 7,
                    label: 'my_test',
                },
                {
                    id: 6,
                    label: 'JustTest_2',
                },
            ]);
        });

        it('should make filtered options equal to options if init search was empty string', async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            component.optionsList = new Array(5).fill(null).map((_: null, index: number) => {
                return {
                    id: index,
                    label: `name_${index}`,
                };
            });
            component.control = new FormControl(null);

            fixture.detectChanges();

            expect(component.filteredOptions).toEqual(component.optionsList);
        });

        it('should make init filter using external control value', async () => {
            await makeTestingModule();
            fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
            component = fixture.componentInstance;

            component.optionsList = [
                {
                    id: 5,
                    label: 'test_1',
                },
                {
                    id: 6,
                    label: 'JustTest_2',
                },
                {
                    id: 7,
                    label: 'my_test',
                },
            ];
            component.control = new FormControl({
                id: 6,
                label: 'JustTest_2',
            });

            fixture.detectChanges();

            expect(component.filteredOptions).toEqual([
                {
                    id: 6,
                    label: 'JustTest_2',
                },
            ]);
        });
    });

    describe('ngOnChanges', () => {
        const eventEmitter = new Subject<void>();
        const subscriptions = new Map<string, Subscription>();

        beforeEach(async () => {
            await initDefaultComponent();
        });

        beforeEach(() => {
            when(mockHTMLElement.addEventListener).thenReturn((eventName, handler) => {
                if (subscriptions.has(eventName)) {
                    subscriptions.get(eventName).unsubscribe();
                }
                subscriptions.set(
                    eventName,
                    eventEmitter.subscribe(() => {
                        handler();
                    })
                );
            });
            when(mockHTMLElement.removeEventListener).thenReturn((eventName) => {
                if (subscriptions.has(eventName)) {
                    subscriptions.get(eventName).unsubscribe();
                }
            });

            when(mockMatAutocompleteTrigger.openPanel()).thenReturn();
            when(mockMatAutocompleteTrigger.closePanel()).thenReturn();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should add observable that call close panel on any scroll', () => {
            when(mockMatAutocomplete.isOpen).thenReturn(true);

            component.scrollableWindow = instance(mockHTMLElement);
            component.autocomplete = instance(mockMatAutocomplete);
            component.trigger = instance(mockMatAutocompleteTrigger);

            // fixture detect changes doesn't call ngOnChanges hook
            component.ngOnChanges({
                scrollableWindow: {
                    previousValue: undefined,
                    currentValue: component.scrollableWindow,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
            });

            eventEmitter.next();

            verify(mockMatAutocompleteTrigger.closePanel()).once();
        });

        it('should not close panel if panel already closed', () => {
            when(mockMatAutocomplete.isOpen).thenReturn(false);

            component.scrollableWindow = instance(mockHTMLElement);
            component.autocomplete = instance(mockMatAutocomplete);
            component.trigger = instance(mockMatAutocompleteTrigger);

            // fixture detect changes doesn't call ngOnChanges hook
            component.ngOnChanges({
                scrollableWindow: {
                    previousValue: undefined,
                    currentValue: component.scrollableWindow,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
            });

            eventEmitter.next();

            verify(mockMatAutocompleteTrigger.closePanel()).never();
        });
    });

    describe('panelOpened', () => {
        beforeEach(async () => {
            await initDefaultComponent();

            when(mockCdkVirtualScrollViewport.checkViewportSize()).thenReturn();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should check viewport size on each panel opening', () => {
            component.viewport = instance(mockCdkVirtualScrollViewport);

            component.panelOpened();

            verify(mockCdkVirtualScrollViewport.checkViewportSize()).once();
        });

        it(`shouldn't check viewport size if viewport wasn't provided`, () => {
            component.viewport = null;

            component.panelOpened();

            verify(mockCdkVirtualScrollViewport.checkViewportSize()).never();
        });
    });

    describe('getErrorMessage', () => {
        beforeEach(async () => {
            await initDefaultComponent();
        });

        it('should return empty string if control errors is empty object or null', () => {
            component.control.setValidators(() => {
                return null;
            });
            component.control.updateValueAndValidity();

            expect(component.getErrorMessage()).toBe('');
        });

        it(`should use first truthy error from list and return it if it's an string`, () => {
            component.control.setValidators([
                () => {
                    return { first: null };
                },
                () => {
                    return { second: '' };
                },
                () => {
                    return { third: 0 };
                },
                () => {
                    return { fourth: false };
                },
                () => {
                    return { fifth: 'my error' };
                },
                () => {
                    return { sixth: 'another error' };
                },
            ]);
            component.control.updateValueAndValidity();

            expect(component.getErrorMessage()).toBe('my error');
        });

        it(`should parse array error, using it's first element as an error message`, () => {
            component.control.setValidators([
                () => {
                    return { myError: ['my error'] };
                },
            ]);
            component.control.updateValueAndValidity();

            expect(component.getErrorMessage()).toBe('my error');
        });

        it('should return empty string if error has empty array as a value', () => {
            component.control.setValidators([
                () => {
                    return { myError: [] };
                },
            ]);
            component.control.updateValueAndValidity();

            expect(component.getErrorMessage()).toBe('');
        });
    });

    describe('selectionChanged', () => {
        beforeEach(async () => {
            await initDefaultComponent();
        });

        it('should update component control value', () => {
            expect(component.control.value).toBe(null);

            component.selectionChanged({ id: 1, label: 'my option' });

            expect(component.control.value).toEqual({ id: 1, label: 'my option' });
        });
    });

    describe('clearValue', () => {
        beforeEach(async () => {
            await initDefaultComponent();
        });

        it('should clear control value', () => {
            component.control.setValue({ id: 1, label: 'my option' });

            component.clearValue();

            expect(component.control.value).toBe(null);
        });

        it('should clear search control', () => {
            component.searchControl.setValue('my search');

            component.clearValue();

            expect(component.searchControl.value).toBe('');
        });

        describe('panel open', () => {
            beforeEach(() => {
                when(mockMatAutocompleteTrigger.openPanel()).thenReturn();
            });

            it('should open panel after tick', async () => {
                when(mockMatAutocomplete.isOpen).thenReturn(false);

                component.trigger = instance(mockMatAutocompleteTrigger);
                component.autocomplete = instance(mockMatAutocomplete);
                component.clearValue();

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(null);
                    }, 0);
                });

                verify(mockMatAutocompleteTrigger.openPanel()).once();
                expect().nothing();
            });

            it('should not open panel after tick if panel was opened', async () => {
                when(mockMatAutocomplete.isOpen).thenReturn(true);

                component.trigger = instance(mockMatAutocompleteTrigger);
                component.autocomplete = instance(mockMatAutocomplete);
                component.clearValue();

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(null);
                    }, 0);
                });

                verify(mockMatAutocompleteTrigger.openPanel()).never();
                expect().nothing();
            });
        });
    });
});
