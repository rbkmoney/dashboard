import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBinPanFilterComponent } from './card-bin-pan-filter.component';

describe('CardBinPanFilterComponent', () => {
    let component: CardBinPanFilterComponent;
    let fixture: ComponentFixture<CardBinPanFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardBinPanFilterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardBinPanFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
