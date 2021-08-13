import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { instance, mock, verify } from 'ts-mockito';

import { CreateShopDialogComponent } from './create-shop-dialog.component';
import { ShopType } from './types/shop-type';

@Component({ template: '' })
class MockOnBoardingComponent {}

describe('CreateShopDialogComponent', () => {
    let component: CreateShopDialogComponent;
    let fixture: ComponentFixture<CreateShopDialogComponent>;
    let mockDialogRef: MatDialogRef<CreateShopDialogComponent, 'cancel' | 'send'>;
    let router: Router;

    beforeEach(() => {
        mockDialogRef = mock<MatDialogRef<CreateShopDialogComponent, 'cancel' | 'send'>>(MatDialogRef);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatRadioModule,
                TranslocoTestingModule.withLangs({
                    en: {
                        'create-shop': {
                            title: 'Новая заявка',
                            type: 'Выберите тип заявки',
                            russianLegalEntityType: 'Создание магазина (текущее ЮЛ)',
                            newLegalEntityType: 'Создание магазина (новое ЮЛ)',
                            internationalLegalEntityType: 'Создание магазина (международное ЮЛ)',
                        },
                    },
                }),
                RouterTestingModule.withRoutes([
                    {
                        path: 'claim-section/onboarding',
                        component: MockOnBoardingComponent,
                    },
                ]),
            ],
            declarations: [CreateShopDialogComponent, MockOnBoardingComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => instance(mockDialogRef),
                },
            ],
        })
            .overrideComponent(CreateShopDialogComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateShopDialogComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onTypeChange', () => {
        it('should change selectedShopType', () => {
            component.onTypeChange(ShopType.International);
            expect(component.selectedShopType).toBe(ShopType.International);

            component.onTypeChange(ShopType.New);
            expect(component.selectedShopType).toBe(ShopType.New);

            component.onTypeChange(ShopType.Russian);
            expect(component.selectedShopType).toBe(ShopType.Russian);
        });
    });

    describe('next', () => {
        it('should change selectionConfirmed in true', () => {
            expect(component.selectionConfirmed).toBe(false);

            component.next();

            expect(component.selectionConfirmed).toBe(true);
        });

        it('should close dialog if selectedShopType is new', () => {
            component.onTypeChange(ShopType.New);

            fixture.ngZone.run(() => {
                component.next();
            });

            expect().nothing();
            verify(mockDialogRef.close()).once();
        });

        it('should navigate to onboarding if selectedShopType is new', () => {
            const spyOnNavigate = spyOn(router, 'navigate').and.callThrough();

            component.onTypeChange(ShopType.New);
            fixture.ngZone.run(() => {
                component.next();
            });

            expect(spyOnNavigate).toHaveBeenCalledTimes(1);
            expect(spyOnNavigate).toHaveBeenCalledWith(['claim-section', 'onboarding']);
        });
    });
});
