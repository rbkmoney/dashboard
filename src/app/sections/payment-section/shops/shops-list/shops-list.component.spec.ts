import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { generateMockShopsItemList } from '../tests/generate-mock-shops-item-list';
import { ShopRowHeaderComponent } from './components/shop-row-header/shop-row-header.component';
import { ShopRowComponent } from './components/shop-row/shop-row.component';
import { ShopsExpandedIdManagerService } from './services/shops-expanded-id-manager/shops-expanded-id-manager.service';
import { ShopBalanceModule } from './shop-balance';
import { ShopDetailsModule } from './shop-details';
import { ShopsListComponent } from './shops-list.component';

const TRANSLATION_CONFIG = {
    en: {
        shops: {
            panel: {
                name: 'Name',
                balance: 'Balance',
            },
        },
    },
};

describe('ShopsListComponent', () => {
    let component: ShopsListComponent;
    let fixture: ComponentFixture<ShopsListComponent>;
    let mockExpandedIdManager: ShopsExpandedIdManagerService;

    beforeEach(() => {
        mockExpandedIdManager = mock(ShopsExpandedIdManagerService);

        when(mockExpandedIdManager.expandedId$).thenReturn(of(1));
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LastUpdatedModule,
                AccordionModule,
                CardModule,
                RowModule,
                ToMajorModule,
                ShowMorePanelModule,
                EmptySearchResultModule,
                SpinnerModule,
                ShopDetailsModule,
                FlexLayoutModule,
                TranslocoTestingModule.withLangs(TRANSLATION_CONFIG, {
                    availableLangs: ['en'],
                    defaultLang: 'en',
                }),
                ShopBalanceModule,
                RouterTestingModule.withRoutes([]),
            ],
            declarations: [ShopsListComponent, ShopRowHeaderComponent, ShopRowComponent],
            providers: [
                {
                    provide: ShopsExpandedIdManagerService,
                    useFactory: () => instance(mockExpandedIdManager),
                },
            ],
        })
            .overrideComponent(ShopsListComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('isListExist', () => {
        it('should be true if list was provided', () => {
            component.shopList = [];

            expect(component.isListExist).toBe(true);
        });

        it('should be false if list was not provided', () => {
            expect(component.isListExist).toBe(false);
        });
    });

    describe('isEmptyList', () => {
        it('should be true if list is empty', () => {
            component.shopList = [];

            expect(component.isEmptyList).toBe(true);
        });

        it('should be false if list contains at least one element', () => {
            component.shopList = generateMockShopsItemList(1);

            expect(component.isEmptyList).toBe(false);

            component.shopList = generateMockShopsItemList(100500);

            expect(component.isEmptyList).toBe(false);
        });
    });

    describe('refreshList', () => {
        it('should emit refresh output', () => {
            const spyOnOutput = spyOn(component.refresh, 'emit').and.callThrough();

            component.refreshList();

            expect(spyOnOutput).toHaveBeenCalledTimes(1);
        });
    });

    describe('showMoreElements', () => {
        it('should emit showMore output', () => {
            const spyOnOutput = spyOn(component.showMore, 'emit').and.callThrough();

            component.showMoreElements();

            expect(spyOnOutput).toHaveBeenCalledTimes(1);
        });
    });

    describe('expandedIdChange', () => {
        it('should call expandedIdChange method from expandedIdManager', () => {
            when(mockExpandedIdManager.expandedIdChange(15)).thenReturn();

            component.expandedIdChange(15);

            verify(mockExpandedIdManager.expandedIdChange(15)).once();
            expect().nothing();
        });
    });
});
