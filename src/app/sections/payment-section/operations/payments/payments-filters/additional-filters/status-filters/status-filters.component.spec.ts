import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFiltersComponent } from './status-filters.component';

describe('StatusFilterComponent', () => {
    let component: StatusFiltersComponent;
    let fixture: ComponentFixture<StatusFiltersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusFiltersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
