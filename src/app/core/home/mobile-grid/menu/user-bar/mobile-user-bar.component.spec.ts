import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { KeycloakService } from 'keycloak-angular';
import { instance, mock, verify, when } from 'ts-mockito';

import { MobileUserBarComponent } from './mobile-user-bar.component';

const MOCK_USERNAME = 'TestUserName@user.user';

describe('MobileUserBarComponent', () => {
    let component: MobileUserBarComponent;
    let fixture: ComponentFixture<MobileUserBarComponent>;
    let mockKeycloakService: KeycloakService;

    beforeEach(() => {
        mockKeycloakService = mock(KeycloakService);
    });

    beforeEach(() => {
        when(mockKeycloakService.getUsername()).thenReturn(MOCK_USERNAME);
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatIconTestingModule],
            declarations: [MobileUserBarComponent, MatIcon],
            providers: [
                {
                    provide: KeycloakService,
                    useFactory: () => instance(mockKeycloakService),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileUserBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should update set userName property using keycloak data', () => {
            expect(component.userName).toBe(MOCK_USERNAME);
        });
    });

    describe('logout', () => {
        it('should call keycloak logout method', () => {
            component.logout();

            verify(mockKeycloakService.logout()).once();
            expect().nothing();
        });
    });
});
