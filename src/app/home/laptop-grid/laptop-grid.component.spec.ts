import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopGridComponent } from './laptop-grid.component';

describe('LaptopGridComponent', () => {
    let component: LaptopGridComponent;
    let fixture: ComponentFixture<LaptopGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LaptopGridComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LaptopGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
