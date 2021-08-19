import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { Claim } from '@dsh/api-codegen/claim-management';
import { LoggerService } from '@dsh/app/shared/services/logger/logger.service';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateInternationalShopEntityComponent } from './create-international-shop-entity.component';
import { CreateInternationalShopEntityService } from './services/create-international-shop-entity/create-international-shop-entity.service';
import { InternationalShopFormControllerService } from './services/international-shop-form-controller/international-shop-form-controller.service';
import { createMockShopForm } from './tests/create-mock-shop-form';

@Component({
    selector: 'dsh-shop-form',
    template: '',
})
class MockShopFormComponent {
    @Input() form: FormGroup;
}

describe('CreateInternationalShopEntityComponent', () => {
    let fixture: ComponentFixture<CreateInternationalShopEntityComponent>;
    let component: CreateInternationalShopEntityComponent;
    let mockCreateInternationalShopEntityService: CreateInternationalShopEntityService;
    let mockTranslocoService: TranslocoService;
    let mockMatSnackBar: MatSnackBar;
    let mockRouter: Router;
    let mockLoggerService: LoggerService;
    let mockInternationalShopFormControllerService: InternationalShopFormControllerService;

    beforeEach(() => {
        mockCreateInternationalShopEntityService = mock(CreateInternationalShopEntityService);
        mockTranslocoService = mock(TranslocoService);
        mockMatSnackBar = mock(MatSnackBar);
        mockRouter = mock(Router);
        mockLoggerService = mock(LoggerService);
        mockInternationalShopFormControllerService = mock(InternationalShopFormControllerService);
    });

    beforeEach(() => {
        when(mockInternationalShopFormControllerService.buildForm()).thenReturn(createMockShopForm());
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MatDialogModule, ButtonModule, FlexLayoutModule],
            declarations: [CreateInternationalShopEntityComponent, MockShopFormComponent],
            providers: [
                {
                    provide: CreateInternationalShopEntityService,
                    useFactory: () => instance(mockCreateInternationalShopEntityService),
                },
                {
                    provide: mockTranslocoService,
                    useFactory: () => instance(TranslocoService),
                },
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockMatSnackBar),
                },
                {
                    provide: Router,
                    useFactory: () => instance(mockRouter),
                },
                {
                    provide: LoggerService,
                    useFactory: () => instance(mockLoggerService),
                },
                {
                    provide: InternationalShopFormControllerService,
                    useFactory: () => instance(mockInternationalShopFormControllerService),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateInternationalShopEntityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('createShop', () => {
        const claim: Claim = {
            id: 100500,
            status: 'active',
            changeset: [],
            revision: 5,
            createdAt: new Date(),
        };

        it('should call create shop with form value', () => {
            when(mockCreateInternationalShopEntityService.createShop(deepEqual(component.form.value))).thenReturn(
                of(claim)
            );

            component.createShop();

            verify(mockCreateInternationalShopEntityService.createShop(deepEqual(component.form.value))).once();
            expect().nothing();
        });

        it('should emit send on success', () => {
            const spyOnSend = spyOn(component.send, 'emit').and.callThrough();

            when(mockCreateInternationalShopEntityService.createShop(deepEqual(component.form.value))).thenReturn(
                of(claim)
            );

            component.createShop();

            expect(spyOnSend).toHaveBeenCalledTimes(1);
        });

        it('should navigate to claim with claim id', () => {
            when(mockCreateInternationalShopEntityService.createShop(deepEqual(component.form.value))).thenReturn(
                of(claim)
            );
            when(mockRouter.navigate(deepEqual(['claim-section', 'claims', claim.id]))).thenReturn();

            component.createShop();

            verify(mockRouter.navigate(deepEqual(['claim-section', 'claims', claim.id]))).once();
            expect().nothing();
        });

        it('should log error if error happened', () => {
            const error = new Error('Test error');
            when(mockCreateInternationalShopEntityService.createShop).thenReturn(() =>
                of(claim).pipe(
                    switchMap(() => {
                        throw error;
                    })
                )
            );
            when(mockLoggerService.error(deepEqual(error))).thenReturn();

            component.createShop();

            verify(mockLoggerService.error(deepEqual(error))).once();
            expect().nothing();
        });

        it('should show error snack bar if error happened', () => {
            const error = new Error('Test error');
            when(mockCreateInternationalShopEntityService.createShop).thenReturn(() =>
                of(claim).pipe(
                    switchMap(() => {
                        throw error;
                    })
                )
            );
            when(mockMatSnackBar.open('Что-то пошло не так', 'OK')).thenReturn();

            component.createShop();

            verify(mockMatSnackBar.open('Что-то пошло не так', 'OK')).once();
            expect().nothing();
        });
    });

    describe('cancelCreation', () => {
        it('should emit cancel', () => {
            const spyOnCancel = spyOn(component.cancel, 'emit').and.callThrough();

            component.cancelCreation();

            expect(spyOnCancel).toHaveBeenCalledTimes(1);
        });
    });
});
