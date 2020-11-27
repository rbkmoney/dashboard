import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { MockShopContractDetailsService } from '../../../tests/mock-shop-contract-details-service';
import { ShopContractDetailsService } from '../../services/shop-contract-details/shop-contract-details.service';
import { ShopContractDetailsComponent } from './shop-contract-details.component';

describe('ShopContractDetailsComponent', () => {
    let component: ShopContractDetailsComponent;
    let fixture: ComponentFixture<ShopContractDetailsComponent>;
    let mockContractsService: MockShopContractDetailsService;

    beforeEach(() => {
        mockContractsService = new MockShopContractDetailsService();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        en: {
                            shops: {
                                shopContract: {
                                    title: 'ShopContractTitle',
                                    error: 'ShopContractError',
                                },
                            },
                        },
                    },
                    {
                        availableLangs: ['en'],
                        defaultLang: 'en',
                    }
                ),
            ],
            declarations: [ShopContractDetailsComponent],
            providers: [
                {
                    provide: ShopContractDetailsService,
                    useValue: mockContractsService,
                },
            ],
        })
            .overrideComponent(ShopContractDetailsComponent, {
                set: {
                    providers: [],
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopContractDetailsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('contractID', () => {
        it('should call getContract on id change', () => {
            const spyOnGetContract = spyOn(mockContractsService, 'getContract').and.callThrough();

            component.contractID = 'my_id';

            expect(spyOnGetContract).toHaveBeenCalledTimes(1);
            expect(spyOnGetContract).toHaveBeenCalledWith('my_id');
        });
    });
});
