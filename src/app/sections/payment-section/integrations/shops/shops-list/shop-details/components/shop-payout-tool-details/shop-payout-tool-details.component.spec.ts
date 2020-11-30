import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { MockShopPayoutToolDetailsService } from '../../../tests/mock-shop-payout-tool-details-service';
import { ShopPayoutToolDetailsService } from '../../services/shop-payout-tool-details/shop-payout-tool-details.service';
import { ShopPayoutToolDetailsComponent } from './shop-payout-tool-details.component';

describe('ShopPayoutToolDetailsComponent', () => {
    let component: ShopPayoutToolDetailsComponent;
    let fixture: ComponentFixture<ShopPayoutToolDetailsComponent>;
    let mockPayoutsService: MockShopPayoutToolDetailsService;

    beforeEach(() => {
        mockPayoutsService = new MockShopPayoutToolDetailsService();
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        en: {
                            shops: {
                                shopPayoutTool: {
                                    title: 'ShopPayoutTooltTitle',
                                    error: 'ShopPayoutTooltError',
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
            declarations: [ShopPayoutToolDetailsComponent],
            providers: [
                {
                    provide: ShopPayoutToolDetailsService,
                    useValue: mockPayoutsService,
                },
            ],
        })
            .overrideComponent(ShopPayoutToolDetailsComponent, {
                set: {
                    providers: [],
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopPayoutToolDetailsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('contractID', () => {
        it('should call getContract on id change', () => {
            const spyOnGetContract = spyOn(mockPayoutsService, 'getPayoutTool').and.callThrough();

            component.payoutToolParams = {
                contractID: 'my_contract_id',
                payoutToolID: 'my_payout_tool_id',
            };

            expect(spyOnGetContract).toHaveBeenCalledTimes(1);
            expect(spyOnGetContract).toHaveBeenCalledWith({
                contractID: 'my_contract_id',
                payoutToolID: 'my_payout_tool_id',
            });
        });
    });
});
