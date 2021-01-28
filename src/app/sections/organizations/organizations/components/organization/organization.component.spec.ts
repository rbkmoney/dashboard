import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { anyString, instance, mock, when } from 'ts-mockito';

import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorModule } from '@dsh/app/shared/services/error';
import { NotificationModule } from '@dsh/app/shared/services/notification';
import { DetailsItemComponent, DetailsItemModule } from '@dsh/components/layout';

import { OrganizationRolesComponent, OrganizationRolesModule } from '../../../organization-roles';
import { OrganizationManagementService } from '../../../services/organization-management/organization-management.service';
import { mockMember } from '../../../tests/mock-member';
import { mockOrg } from '../../../tests/mock-org';
import { OrganizationComponent } from './organization.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-organization [organization]="organization"></dsh-organization>`,
})
class HostComponent {
    organization = mockOrg;
}

describe('OrganizationComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
    let mockOrganizationManagementService: OrganizationManagementService;

    beforeEach(() => {
        mockOrganizationManagementService = mock(OrganizationManagementService);

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                FlexLayoutModule,
                DetailsItemModule,
                MatDialogModule,
                NotificationModule,
                ErrorModule,
                OrganizationRolesModule,
                NoopAnimationsModule,
            ],
            declarations: [HostComponent, OrganizationComponent],
            providers: [
                {
                    provide: DIALOG_CONFIG,
                    useValue: {},
                },
            ],
        }).compileComponents();

        TestBed.overrideComponent(OrganizationComponent, {
            set: {
                providers: [
                    {
                        provide: OrganizationManagementService,
                        useValue: instance(mockOrganizationManagementService),
                    },
                ],
            },
        });

        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        when(mockOrganizationManagementService.getCurrentMember(anyString())).thenReturn(of(mockMember));
        when(mockOrganizationManagementService.isOrganizationOwner).thenReturn(() => of(true));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should display organization employees', () => {
            const item = fixture.debugElement
                .query(By.directive(DetailsItemComponent))
                .query(By.css('.dsh-details-item-content'));
            expect(item.nativeElement.textContent.trim()).toEqual('7');
        });

        it('should display roles', () => {
            const roles = fixture.debugElement.query(By.directive(OrganizationRolesComponent));
            expect(roles).toBeTruthy();
        });
    });
});
