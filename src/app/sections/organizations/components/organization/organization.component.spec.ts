import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { anyString, anything, mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { MOCK_MEMBER } from '@dsh/api/organizations/tests/mock-member';
import { MOCK_ORG } from '@dsh/api/organizations/tests/mock-org';
import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { KeycloakTokenInfoService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { OrganizationRolesModule } from '@dsh/app/shared/components/organization-roles';
import { ErrorModule, ErrorService } from '@dsh/app/shared/services/error';
import { NotificationModule, NotificationService } from '@dsh/app/shared/services/notification';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';
import { DetailsItemModule } from '@dsh/components/layout';

import { FetchOrganizationsService } from '../../services/fetch-organizations/fetch-organizations.service';
import { OrganizationComponent } from './organization.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-organization [organization]="organization"></dsh-organization>`,
})
class HostComponent {
    organization = MOCK_ORG;
}

describe('OrganizationComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: OrganizationComponent;
    let debugElement: DebugElement;
    let mockOrganizationManagementService: OrganizationManagementService;
    let mockOrganizationsService: OrganizationsService;
    let mockDialog: MatDialog;
    let mockNotificationService: NotificationService;
    let mockFetchOrganizationsService: FetchOrganizationsService;

    beforeEach(async () => {
        mockOrganizationManagementService = mock(OrganizationManagementService);
        mockOrganizationsService = mock(OrganizationsService);
        mockDialog = mock(MatDialog);
        mockNotificationService = mock(NotificationService);
        mockFetchOrganizationsService = mock(FetchOrganizationsService);

        when(mockOrganizationManagementService.currentMember$).thenReturn(of(MOCK_MEMBER));
        when(mockOrganizationManagementService.isOrganizationOwner$).thenReturn(of(true));
        when(mockOrganizationsService.cancelOrgMembership(anyString())).thenReturn(of(null));
        when(mockOrganizationsService.listOrgMembers(anyString())).thenReturn(
            of({ result: new Array(15).fill(MOCK_MEMBER) })
        );

        await TestBed.configureTestingModule({
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
                provideMockService(OrganizationManagementService, mockOrganizationManagementService),
                provideMockToken(DIALOG_CONFIG, { small: {}, medium: {}, large: {} }),
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(NotificationService, mockNotificationService),
                provideMockService(ErrorService),
                provideMockService(FetchOrganizationsService, mockFetchOrganizationsService),
                provideMockService(MatDialog, mockDialog),
                provideMockService(KeycloakTokenInfoService),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(OrganizationComponent));
        component = debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be init', () => {
        expect(component.organization).toBe(MOCK_ORG);
    });

    describe('leave', () => {
        it('should be leave', () => {
            when(mockDialog.open(anything())).thenReturn({
                afterClosed: () => of('confirm'),
            } as MatDialogRef<any>);
            component.leave();
            verify(mockDialog.open(anything())).once();
            verify(mockOrganizationsService.cancelOrgMembership(MOCK_ORG.id)).once();
            verify(mockNotificationService.success()).once();
            expect().nothing();
        });
    });

    describe('rename', () => {
        it('should be renamed', () => {
            when(mockDialog.open(anything(), anything())).thenReturn({
                afterClosed: () => of(BaseDialogResponseStatus.SUCCESS),
            } as MatDialogRef<any>);
            component.rename();
            verify(mockDialog.open(anything(), anything())).once();
            verify(mockFetchOrganizationsService.refresh()).once();
            expect().nothing();
        });
    });
});
