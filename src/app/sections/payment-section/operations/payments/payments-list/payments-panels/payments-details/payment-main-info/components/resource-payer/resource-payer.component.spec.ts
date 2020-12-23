import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePayerComponent } from './resource-payer.component';

xdescribe('ResourcePayerComponent', () => {
    let component: ResourcePayerComponent;
    let fixture: ComponentFixture<ResourcePayerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResourcePayerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourcePayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
