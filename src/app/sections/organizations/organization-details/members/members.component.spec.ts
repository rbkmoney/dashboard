import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { mockMembers } from '../../tests/mock-members';
import { mockOrg } from '../../tests/mock-org';
import { MembersComponent } from './members.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-members></dsh-members>`,
})
class HostComponent {}

describe('MembersComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: MembersComponent;
    let mockOrganizationsService: OrganizationsService;
    let mockRoute: ActivatedRoute;

    beforeEach(async () => {
        mockOrganizationsService = mock(OrganizationsService);
        mockRoute = mock(ActivatedRoute);

        await TestBed.configureTestingModule({
            declarations: [HostComponent, MembersComponent],
            providers: [
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(ActivatedRoute, mockRoute),
                provideMockService(ErrorService),
            ],
        }).compileComponents();

        when(mockRoute.params).thenReturn(of({ orgId: mockOrg.id }));
        when(mockOrganizationsService.getOrg(mockOrg.id)).thenReturn(of(mockOrg));
        when(mockOrganizationsService.listOrgMembers(mockOrg.id)).thenReturn(of(mockMembers));

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(MembersComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('init', () => {
        it('should load organization$', () => {
            const expected$ = cold('(a|)', { a: mockOrg });
            component.organization$.subscribe();
            verify(mockOrganizationsService.getOrg(mockOrg.id)).once();
            expect(component.organization$).toBeObservable(expected$);
        });
        it('should load members$', () => {
            const expected$ = cold('(a)', { a: mockMembers.result });
            expect(component.members$).toBeObservable(expected$);
        });
        it('should load invitations$', () => {
            const expected$ = cold('(a)', { a: false });
            expect(component.isLoading$).toBeObservable(expected$);
        });
    });

    describe('refresh', () => {
        it('should load memebers$', () => {
            component.members$.subscribe();
            component.refresh();
            verify(mockOrganizationsService.listOrgMembers(mockOrg.id)).twice();
            const expected$ = cold('(a)', { a: mockMembers.result });
            expect(component.members$).toBeObservable(expected$);
        });
    });
});
