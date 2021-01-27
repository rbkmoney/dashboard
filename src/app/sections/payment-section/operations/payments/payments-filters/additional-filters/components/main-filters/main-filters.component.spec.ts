import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFiltersComponent } from './main-filters.component';

describe('MainFiltersComponent', () => {
    let component: MainFiltersComponent;
    let fixture: ComponentFixture<MainFiltersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainFiltersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
