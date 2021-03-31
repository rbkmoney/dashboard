import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockService } from '@dsh/app/shared/tests';

import { FetchOrganizationsService } from '../../services/fetch-organizations/fetch-organizations.service';
import { OrganizationsExpandedIdManager } from './organizations-expanded-id-manager.service';

describe('OrganizationsExpandedIdManager', () => {
    let service: OrganizationsExpandedIdManager;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [provideMockService(FetchOrganizationsService), OrganizationsExpandedIdManager],
        });
        service = TestBed.inject(OrganizationsExpandedIdManager);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
