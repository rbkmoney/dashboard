import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { RowModule } from '@dsh/components/layout';

import { ShopRowHeaderComponent } from './shop-row-header.component';

const TRANSLATION_CONFIG = {
    en: {
        shops: {
            panel: {
                name: 'Name',
                balance: 'Balance',
            },
        },
    },
};

describe('ShopRowHeaderComponent', () => {
    let fixture: ComponentFixture<ShopRowHeaderComponent>;
    let component: ShopRowHeaderComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RowModule,
                TranslocoTestingModule.withLangs(TRANSLATION_CONFIG, {
                    availableLangs: ['en'],
                    defaultLang: 'en',
                }),
            ],
            declarations: [ShopRowHeaderComponent],
        })
            .overrideComponent(ShopRowHeaderComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopRowHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // describe('template', () => {
    //     it('should render columns with names from translation config', () => {
    //         const columns = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-header-label'));
    //
    //         expect(columns[0].nativeElement.textContent.trim()).toBe(TRANSLATION_CONFIG.en.shops.panel.name);
    //         expect(columns[1].nativeElement.textContent.trim()).toBe(TRANSLATION_CONFIG.en.shops.panel.balance);
    //     });
    // });
});
