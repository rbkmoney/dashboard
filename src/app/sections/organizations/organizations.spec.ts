import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { OrganizationsComponent } from './organizations.component';

describe('Organizations', () => {
    let component: OrganizationsComponent;
    let fixture: ComponentFixture<OrganizationsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } })],
            declarations: [OrganizationsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OrganizationsComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
