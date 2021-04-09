import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { QueryFilterModule } from '@dsh/app/shared/components/filters/query-filter';

import { ShopQueryFilterComponent } from './shop-query-filter.component';

describe('ShopNameFilterComponent', () => {
    let component: ShopQueryFilterComponent;
    let fixture: ComponentFixture<ShopQueryFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                QueryFilterModule,
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
            declarations: [ShopQueryFilterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopQueryFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onFilterChanged', () => {
        it('should emit filterChanged', () => {
            const spyOnFilterChanged = spyOn(component.filterChanged, 'emit').and.callThrough();

            component.onFilterChanged('searchValue');

            expect(spyOnFilterChanged).toHaveBeenCalledTimes(1);
            expect(spyOnFilterChanged).toHaveBeenCalledWith('searchValue');
        });
    });
});
