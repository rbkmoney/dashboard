import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { ShopsFiltersStoreService } from '../services/shops-filters-store/shops-filters-store.service';
import { ShopFiltersComponent } from './shop-filters.component';
import { ShopQueryFilterModule } from './shop-query-filter';

describe('ShopFiltersComponent', () => {
    let component: ShopFiltersComponent;
    let fixture: ComponentFixture<ShopFiltersComponent>;
    let mockShopsFiltersStoreService: ShopsFiltersStoreService;

    beforeEach(() => {
        mockShopsFiltersStoreService = mock(ShopsFiltersStoreService);
        when(mockShopsFiltersStoreService.data$).thenReturn(of({}));
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                ShopQueryFilterModule,
                FlexLayoutModule,
                TranslocoTestingModule.withLangs({
                    en: {
                        shops: {
                            panel: {
                                name: 'Name',
                            },
                            title: 'Title',
                        },
                    },
                }),
            ],
            declarations: [ShopFiltersComponent],
            providers: [
                {
                    provide: ShopsFiltersStoreService,
                    useFactory: () => instance(mockShopsFiltersStoreService),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onQueryChanged', () => {
        it('should preserve query params store', () => {
            const newFiltersData = { query: 'myValue' };
            when(mockShopsFiltersStoreService.preserve(deepEqual(newFiltersData))).thenReturn(null);

            component.onQueryChanged('myValue');

            verify(mockShopsFiltersStoreService.preserve(deepEqual(newFiltersData))).once();
            expect().nothing();
        });
    });
});
