import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { anyString, anything, instance, mock, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorModule, ErrorService } from '@dsh/app/shared/services/error';
import { NotificationModule, NotificationService } from '@dsh/app/shared/services/notification';
import { getTextContent } from '@dsh/app/shared/tests';
import { DetailsItemComponent, DetailsItemModule } from '@dsh/components/layout';

import { OrganizationRolesComponent, OrganizationRolesModule } from '../../../organization-roles';
import { FetchOrganizationsService } from '../../../services/fetch-organizations/fetch-organizations.service';
import { OrganizationManagementService } from '../../../services/organization-management/organization-management.service';
import { MOCK_MEMBER } from '../../../tests/mock-member';
import { MOCK_ORG } from '../../../tests/mock-org';
import { OrganizationComponent } from './organization.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-organization [organization]="organization"></dsh-organization>`,
})
class HostComponent {
    organization = MOCK_ORG;
}

describe('OrganizationComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
    let mockOrganizationManagementService: OrganizationManagementService;
    let mockOrganizationsService: OrganizationsService;

    beforeEach(() => {
        mockOrganizationManagementService = mock(OrganizationManagementService);
        mockOrganizationsService = mock(OrganizationsService);

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
                MatDividerModule,
            ],
            declarations: [HostComponent, OrganizationComponent],
            providers: [
                { provide: OrganizationManagementService, useValue: instance(mockOrganizationManagementService) },
                { provide: DIALOG_CONFIG, useValue: {} },
                { provide: OrganizationsService, useValue: instance(mockOrganizationsService) },
                { provide: NotificationService, useValue: instance(mock(NotificationService)) },
                { provide: ErrorService, useValue: instance(mock(ErrorService)) },
                { provide: FetchOrganizationsService, useValue: instance(mock(FetchOrganizationsService)) },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        when(mockOrganizationManagementService.getCurrentMember(anyString())).thenReturn(of(MOCK_MEMBER));
        when(mockOrganizationManagementService.isOrganizationOwner(anything())).thenReturn(of(true));
        when(mockOrganizationsService.listOrgMembers(anyString())).thenReturn(
            of({ result: new Array(15).fill(MOCK_MEMBER) })
        );
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
            expect(getTextContent(item.nativeElement.textContent)).toEqual('15');
        });

        it('should display roles', () => {
            const roles = fixture.debugElement.query(By.directive(OrganizationRolesComponent));
            expect(roles).toBeTruthy();
        });
    });
});
