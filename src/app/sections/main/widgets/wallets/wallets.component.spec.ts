import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsComponent } from './wallets.component';

describe('WalletsWidgetComponent', () => {
    let component: WalletsComponent;
    let fixture: ComponentFixture<WalletsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WalletsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
