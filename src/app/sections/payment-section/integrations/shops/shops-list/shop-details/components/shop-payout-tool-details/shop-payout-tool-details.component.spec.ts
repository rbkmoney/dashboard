import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { ShopPayoutToolDetailsService } from '../../../../services/shop-payout-tool-details/shop-payout-tool-details.service';
import { ShopPayoutToolDetailsComponent } from './shop-payout-tool-details.component';

describe('ShopPayoutToolDetailsComponent', () => {
    let component: ShopPayoutToolDetailsComponent;
    let fixture: ComponentFixture<ShopPayoutToolDetailsComponent>;
    let mockPayoutsService: ShopPayoutToolDetailsService;

    beforeEach(() => {
        mockPayoutsService = mock(ShopPayoutToolDetailsService);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            declarations: [ShopPayoutToolDetailsComponent],
            providers: [
                {
                    provide: ShopPayoutToolDetailsService,
                    useFactory: () => instance(mockPayoutsService),
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
    });

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
            when(
                mockPayoutsService.requestPayoutTool(
                    deepEqual({
                        contractID: 'my_contract_id',
                        payoutToolID: 'my_payout_tool_id',
                    })
                )
            ).thenReturn();

            component.payoutToolParams = {
                contractID: 'my_contract_id',
                payoutToolID: 'my_payout_tool_id',
            };

            verify(
                mockPayoutsService.requestPayoutTool(
                    deepEqual({
                        contractID: 'my_contract_id',
                        payoutToolID: 'my_payout_tool_id',
                    })
                )
            ).once();
            expect().nothing();
        });
    });
});
