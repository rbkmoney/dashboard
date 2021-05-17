import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { FetchOrganizationsService } from '@dsh/app/shared/services/fetch-organizations';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule } from '@dsh/components/indicators';
import { ScrollUpModule } from '@dsh/components/navigation';

import { OrganizationsComponent } from './organizations.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-organizations></dsh-organizations>`,
})
class HostComponent {}

describe('OrganizationsComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: OrganizationsComponent;
    let mockFetchOrganizationsService: FetchOrganizationsService;
    let mockDialog: MatDialog;

    beforeEach(async () => {
        mockFetchOrganizationsService = mock(FetchOrganizationsService);
        mockDialog = mock(MatDialog);

        await TestBed.configureTestingModule({
            imports: [
                ScrollUpModule,
                IndicatorsModule,
                EmptySearchResultModule,
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
            ],
            declarations: [HostComponent, OrganizationsComponent],
            providers: [
                { provide: FetchOrganizationsService, useValue: instance(mockFetchOrganizationsService) },
                { provide: MatDialog, useValue: instance(mockDialog) },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(OrganizationsComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be init', () => {
        verify(mockFetchOrganizationsService.search()).once();
        expect().nothing();
    });

    describe('createOrganization', () => {
        afterEach(() => {
            expect().nothing();
        });

        it('success', () => {
            when(mockDialog.open(anything())).thenReturn({
                afterClosed: () => of(BaseDialogResponseStatus.Success),
            } as MatDialogRef<any>);
            component.createOrganization();
            verify(mockDialog.open(anything())).once();
            verify(mockFetchOrganizationsService.refresh()).once();
        });

        it('cancelled', () => {
            when(mockDialog.open(anything())).thenReturn({
                afterClosed: () => of(BaseDialogResponseStatus.Cancelled),
            } as MatDialogRef<any>);
            component.createOrganization();
            verify(mockDialog.open(anything())).once();
            verify(mockFetchOrganizationsService.refresh()).never();
        });
    });
});
