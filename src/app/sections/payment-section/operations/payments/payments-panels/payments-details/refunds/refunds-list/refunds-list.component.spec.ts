import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundsListComponent } from './refunds-list.component';

describe('RefundsListComponent', () => {
    let component: RefundsListComponent;
    let fixture: ComponentFixture<RefundsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RefundsListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RefundsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
