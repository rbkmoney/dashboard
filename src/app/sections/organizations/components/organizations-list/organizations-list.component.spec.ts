import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { instance, mock } from 'ts-mockito';

import { OrganizationsExpandedIdManager } from '../../services/organizations-expanded-id-manager/organizations-expanded-id-manager.service';
import { OrganizationsListComponent } from './organizations-list.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-organizations-list></dsh-organizations-list>`,
})
class HostComponent {}

describe('OrganizationsListComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: OrganizationsListComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } })],
            declarations: [HostComponent, OrganizationsListComponent],
        })
            .overrideComponent(OrganizationsListComponent, {
                set: {
                    providers: [
                        {
                            provide: OrganizationsExpandedIdManager,
                            useValue: instance(mock(OrganizationsExpandedIdManager)),
                        },
                    ],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(OrganizationsListComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
