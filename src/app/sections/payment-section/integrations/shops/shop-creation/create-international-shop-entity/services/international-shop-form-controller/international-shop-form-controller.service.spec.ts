import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { createMockPayoutToolForm } from '../../tests/create-mock-payout-tool-form';
import { createMockShopForm } from '../../tests/create-mock-shop-form';
import { InternationalPayoutToolFormService } from '../international-payout-tool-form/international-payout-tool-form.service';
import { InternationalShopFormControllerService } from './international-shop-form-controller.service';

describe('InternationalShopFormControllerService', () => {
    let service: InternationalShopFormControllerService;
    let mockFormBuilder: FormBuilder;
    let mockInternationalPayoutToolFormService: InternationalPayoutToolFormService;

    beforeEach(() => {
        mockFormBuilder = mock(FormBuilder);
        mockInternationalPayoutToolFormService = mock(InternationalPayoutToolFormService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InternationalShopFormControllerService,
                {
                    provide: FormBuilder,
                    useFactory: () => instance(mockFormBuilder),
                },
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
            when(
                mockFormBuilder.group(
                    deepEqual({
                        shopUrl: ['', [Validators.required]],
                        shopName: ['', [Validators.required]],
                        organizationName: ['', [Validators.required]],
                        tradingName: [''],
                        registeredAddress: ['', [Validators.required]],
                        actualAddress: [''],
                        payoutTool: mockPayoutToolGroup,
                    })
                )
            ).thenReturn(createMockShopForm());

            const form = service.buildForm();

            verify(mockInternationalPayoutToolFormService.getForm()).once();
            expect(form.value).toEqual({
                shopUrl: '',
                shopName: '',
                organizationName: '',
                tradingName: '',
                registeredAddress: '',
                actualAddress: '',
                payoutTool: {
                    number: '',
                    iban: '',
                    bic: '',
                    abaRtn: '',
                    name: '',
                    country: '',
                    address: '',
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
