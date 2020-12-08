import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock, verify, when } from 'ts-mockito';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { ShopContractDetailsService } from '../../../../services/shop-contract-details/shop-contract-details.service';
import { ShopContractDetailsComponent } from './shop-contract-details.component';

describe('ShopContractDetailsComponent', () => {
    let component: ShopContractDetailsComponent;
    let fixture: ComponentFixture<ShopContractDetailsComponent>;
    let mockContractsService: ShopContractDetailsService;

    beforeEach(() => {
        mockContractsService = mock(ShopContractDetailsService);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            declarations: [ShopContractDetailsComponent],
            providers: [
                {
                    provide: ShopContractDetailsService,
                    useFactory: () => instance(mockContractsService),
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
            when(mockContractsService.requestContract('my_id')).thenReturn();

            component.contractID = 'my_id';

            verify(mockContractsService.requestContract('my_id')).once();
            expect().nothing();
        });
    });
});
