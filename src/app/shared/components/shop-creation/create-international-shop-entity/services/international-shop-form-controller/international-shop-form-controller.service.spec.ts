import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@ngneat/reactive-forms';
import { instance, mock, verify, when } from 'ts-mockito';

import { createMockPayoutToolForm } from '../../tests/create-mock-payout-tool-form';
import { createMockShopForm } from '../../tests/create-mock-shop-form';
import { InternationalPayoutToolFormService } from '../international-payout-tool-form/international-payout-tool-form.service';
import { InternationalShopFormControllerService } from './international-shop-form-controller.service';

describe('InternationalShopFormControllerService', () => {
    let service: InternationalShopFormControllerService;
    let mockInternationalPayoutToolFormService: InternationalPayoutToolFormService;

    beforeEach(() => {
        mockInternationalPayoutToolFormService = mock(InternationalPayoutToolFormService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InternationalShopFormControllerService,
                FormBuilder,
                {
                    provide: InternationalPayoutToolFormService,
                    useFactory: () => instance(mockInternationalPayoutToolFormService),
                },
            ],
        });
        service = TestBed.inject(InternationalShopFormControllerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('buildForm', () => {
        it('should build form', () => {
            const mockPayoutToolGroup = createMockPayoutToolForm();

            when(mockInternationalPayoutToolFormService.getForm()).thenReturn(mockPayoutToolGroup);

            const form = service.buildForm();

            verify(mockInternationalPayoutToolFormService.getForm()).once();
            expect(form.value).toEqual({
                shopDetails: {
                    url: '',
                    name: '',
                    category: null,
                },
                organizationName: '',
                tradingName: '',
                registeredAddress: '',
                actualAddress: '',
                country: '',
                paymentInstitution: null,
                payoutTool: {
                    number: '',
                    iban: '',
                    bic: '',
                    abaRtn: '',
                    name: '',
                    country: '',
                    address: '',
                    currency: '',
                },
            });
        });
    });

    describe('addCorrespondentPayoutTool', () => {
        it('should add control to existing form', () => {
            const mockPayoutToolGroup = createMockPayoutToolForm();
            const form = createMockShopForm();
            const savedFormValue = form.value;

            when(mockInternationalPayoutToolFormService.getForm()).thenReturn(mockPayoutToolGroup);

            service.addCorrespondentPayoutTool(form);

            expect(form.value).toEqual({
                ...savedFormValue,
                correspondentPayoutTool: mockPayoutToolGroup.value,
            });
        });
    });

    describe('removeCorrespondentPayoutTool', () => {
        it('should remove control from existing form', () => {
            const mockPayoutToolGroup = createMockPayoutToolForm();
            const mockCorrespondentPayoutTool = createMockPayoutToolForm();
            const form = createMockShopForm({
                correspondentPayoutTool: mockCorrespondentPayoutTool,
            });
            const savedFormValue = form.value;

            when(mockInternationalPayoutToolFormService.getForm()).thenReturn(mockPayoutToolGroup);

            service.removeCorrespondentPayoutTool(form);

            expect(savedFormValue.correspondentPayoutTool).toEqual(mockCorrespondentPayoutTool.value);
            expect(form.value.correspondentPayoutTool).toBeUndefined();
            // eslint-disable-next-line no-prototype-builtins
            expect(form.value.hasOwnProperty('correspondentPayoutTool')).toBe(false);
        });
    });

    describe('getPayoutTool', () => {
        it('should return payout tool group from form', () => {
            const mockPayoutToolGroup = createMockPayoutToolForm();
            const form = createMockShopForm({
                payoutTool: mockPayoutToolGroup,
            });

            expect(service.getPayoutTool(form)).toEqual(mockPayoutToolGroup);
            expect(service.getPayoutTool(form).value).toEqual(mockPayoutToolGroup.value);
        });
    });

    describe('getCorrespondentPayoutTool', () => {
        it('should return correspondent payout tool group from form', () => {
            const mockCorrespondentPayoutTool = createMockPayoutToolForm();
            const form = createMockShopForm({
                correspondentPayoutTool: mockCorrespondentPayoutTool,
            });

            expect(service.getCorrespondentPayoutTool(form)).toEqual(mockCorrespondentPayoutTool);
            expect(service.getCorrespondentPayoutTool(form).value).toEqual(mockCorrespondentPayoutTool.value);
        });
    });
});
