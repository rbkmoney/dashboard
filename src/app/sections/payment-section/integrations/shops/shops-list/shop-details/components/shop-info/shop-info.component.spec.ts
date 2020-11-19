import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { Subject } from 'rxjs';

import { DetailsItemModule } from '@dsh/components/layout';

import { Category } from '../../../../../../../../api-codegen/capi/swagger-codegen';
import { ShopBalanceModule } from '../../../shop-balance';
import { CategoryService } from '../../services/category/category.service';
import { ShopInfoComponent } from './shop-info.component';

class MockCategoryService {
    category$ = new Subject<Category>();

    updateID(categoryID: number) {
        this.category$.next({
            categoryID,
            name: 'Mock Category',
        });
    }
}

fdescribe('ShopInfoComponent', () => {
    let component: ShopInfoComponent;
    let fixture: ComponentFixture<ShopInfoComponent>;
    let mockCategoryService: MockCategoryService;

    beforeEach(async(() => {
        mockCategoryService = new MockCategoryService();

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({
                    en: {
                        shops: {
                            panel: {
                                name: 'PanelName',
                                url: 'PanelUrl',
                                balance: 'PanelBalance',
                                createdAt: 'PanelCreatedAt',
                                category: 'PanelCategory',
                            },
                        },
                    },
                }),
                FlexLayoutModule,
                DetailsItemModule,
                ShopBalanceModule,
            ],
            declarations: [ShopInfoComponent],
            providers: [
                {
                    provide: CategoryService,
                    useValue: mockCategoryService,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
