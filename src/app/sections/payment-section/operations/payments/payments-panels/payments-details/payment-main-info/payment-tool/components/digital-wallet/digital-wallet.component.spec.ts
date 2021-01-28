import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalWalletDetailsQIWI } from '@dsh/api-codegen/capi';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { DigitalWalletComponent } from './digital-wallet.component';

describe('DigitalWalletComponent', () => {
    let fixture: ComponentFixture<DigitalWalletComponent>;
    let component: DigitalWalletComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            declarations: [DigitalWalletComponent],
        })
            .overrideComponent(DigitalWalletComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DigitalWalletComponent);
        component = fixture.componentInstance;
        component.qiwi = {
            digitalWalletDetailsType: 'DigitalWalletDetailsQIWI',
            phoneNumberMask: '+7***',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnChanges', () => {
        beforeEach(() => {
            component.qiwi = null;
        });

        it('should update qiwi value using digitalWallet if it has qiwi type', () => {
            component.digitalWallet = {
                digitalWalletDetailsType: 'DigitalWalletDetailsQIWI',
                phoneNumberMask: '+7***',
            } as DigitalWalletDetailsQIWI;

            component.ngOnChanges({
                digitalWallet: {
                    previousValue: null,
                    currentValue: component.digitalWallet,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
            });

            expect(component.qiwi).toEqual(component.digitalWallet as DigitalWalletDetailsQIWI);
        });

        it('should not update qiwi if digital walle is null', () => {
            component.digitalWallet = null;
            component.qiwi = {
                digitalWalletDetailsType: 'DigitalWalletDetailsQIWI',
                phoneNumberMask: '+7***',
            };

            component.ngOnChanges({
                digitalWallet: {
                    previousValue: {
                        digitalWalletDetailsType: 'DigitalWalletDetailsQIWI',
                    },
                    currentValue: null,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
            });

            expect(component.qiwi).toEqual({
                digitalWalletDetailsType: 'DigitalWalletDetailsQIWI',
                phoneNumberMask: '+7***',
            });
        });
    });
});
