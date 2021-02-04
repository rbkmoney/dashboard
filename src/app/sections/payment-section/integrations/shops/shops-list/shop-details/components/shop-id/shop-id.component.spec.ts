import { ClipboardModule } from '@angular/cdk/clipboard';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { ShopIdComponent } from './shop-id.component';

describe('ShopIdComponent', () => {
    let component: ShopIdComponent;
    let fixture: ComponentFixture<ShopIdComponent>;
    let snackbar: MatSnackBar;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        en: {
                            copied: 'Copied!',
                            copyFailed: 'CopyFailed!',
                        },
                    },
                    {
                        availableLangs: ['en'],
                        defaultLang: 'en',
                    }
                ),
                MatSnackBarModule,
                ClipboardModule,
            ],
            declarations: [ShopIdComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopIdComponent);
        component = fixture.componentInstance;
        snackbar = TestBed.inject(MatSnackBar);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('copied', () => {
        it('should open snackbar with successful copy text', () => {
            const spyOnSnackBar = spyOn(snackbar, 'open').and.returnValue(null);

            component.copied(true);

            expect(spyOnSnackBar).toHaveBeenCalledTimes(1);
            expect(spyOnSnackBar).toHaveBeenCalledWith('Copied!', 'OK', { duration: 1000 });
        });

        it('should open snackbar with error copy text', () => {
            const spyOnSnackBar = spyOn(snackbar, 'open').and.returnValue(null);

            component.copied(false);

            expect(spyOnSnackBar).toHaveBeenCalledTimes(1);
            expect(spyOnSnackBar).toHaveBeenCalledWith('CopyFailed!', 'OK', { duration: 1000 });
        });
    });
});
