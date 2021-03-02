import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { BrandType } from '../brand';
import { NavigationService } from '../navigation';
import { MOBILE_MENU_TOKEN } from './consts';
import { MobileGridComponent } from './mobile-grid.component';
import { NavigationFlatNode } from './types/navigation-flat-node';
import { PartialNavigationNode } from './types/partial-navigation-node';

@Component({
    selector: 'dsh-mobile-menu',
    template: '',
})
class MockMobileMenuComponent {
    @Input() menu: NavigationFlatNode[];
    @Input() activeId: string;

    @Output() navigationChanged = new EventEmitter<void>();
}

@Component({
    selector: 'dsh-brand',
    template: '',
})
class MockBrandComponent {
    @Input() type: BrandType = BrandType.normal;
    @Input() navigationLink = '/';
}

describe('MobileGridComponent', () => {
    let component: MobileGridComponent;
    let fixture: ComponentFixture<MobileGridComponent>;
    let mockNavigationService: NavigationService;
    let mockMatDrawer: MatDrawer;

    beforeEach(() => {
        mockNavigationService = mock(NavigationService);
        mockMatDrawer = mock(MatDrawer);
    });

    beforeEach(() => {
        when(mockNavigationService.availableLinks$).thenReturn(of([]));
        when(mockNavigationService.activeLink$).thenReturn(of());
    });

    async function createComponent(menu: PartialNavigationNode[] = []) {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, MatSidenavModule, FlexLayoutModule, MatIconTestingModule],
            declarations: [MobileGridComponent, MockMobileMenuComponent, MatIcon, MockBrandComponent],
            providers: [
                {
                    provide: NavigationService,
                    useFactory: () => instance(mockNavigationService),
                },
                {
                    provide: MOBILE_MENU_TOKEN,
                    useValue: menu,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MobileGridComponent);
        component = fixture.componentInstance;
    }

    it('should create', async () => {
        await createComponent();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('menuIcon', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();
        });

        it('should return "menu_inverted" if logo was inverted', () => {
            component.invertedLogo = true;
            expect(component.menuIcon).toBe('menu_inverted');
        });

        it('should return "menu" if logo was not inverted', () => {
            component.invertedLogo = false;
            expect(component.menuIcon).toBe('menu');
        });
    });

    describe('ngOnInit', () => {
        it('should flat provided mobile menu and map it on availableLinks', async () => {
            when(mockNavigationService.availableLinks$).thenReturn(
                of([
                    {
                        id: 'one',
                        path: '/one',
                        navPlace: {
                            page: 'one',
                        },
                    },
                    {
                        id: 'two one',
                        path: '/two_one',
                        navPlace: {
                            page: 'two_one',
                        },
                    },
                    {
                        id: 'two two',
                        path: '/two_two',
                        navPlace: {
                            page: 'two_two',
                        },
                    },
                    {
                        id: 'three',
                        path: '/three',
                        navPlace: {
                            page: 'three',
                        },
                    },
                    {
                        id: 'four',
                        path: '/four',
                        navPlace: {
                            page: 'four',
                        },
                    },
                ])
            );

            await createComponent([
                { id: 'one' },
                {
                    id: 'two',
                    children: [{ id: 'two one' }, { id: 'two two' }],
                },
                { id: 'three', icon: 'description' },
                { id: 'four' },
            ]);
            fixture.detectChanges();

            expect(component.menu$).toBeObservable(
                cold('(a|)', {
                    a: [
                        {
                            id: 'one',
                            level: 0,
                            meta: {
                                path: '/one',
                            },
                        },
                        {
                            id: 'two',
                            level: 0,
                            isExpanded: false,
                        },
                        {
                            id: 'two one',
                            level: 1,
                            meta: {
                                path: '/two_one',
                            },
                        },
                        {
                            id: 'two two',
                            level: 1,
                            meta: {
                                path: '/two_two',
                            },
                        },
                        {
                            id: 'three',
                            level: 0,
                            meta: {
                                path: '/three',
                                icon: 'description',
                            },
                        },
                        {
                            id: 'four',
                            level: 0,
                            meta: {
                                path: '/four',
                            },
                        },
                    ],
                })
            );
        });
    });

    describe('openSideNav', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();

            component.drawer = instance(mockMatDrawer);
        });

        it('should call drawer open method', () => {
            component.openSideNav();

            verify(mockMatDrawer.open('program')).once();
            expect().nothing();
        });
    });

    describe('closeSideNav', () => {
        beforeEach(async () => {
            await createComponent();
            fixture.detectChanges();

            component.drawer = instance(mockMatDrawer);
        });

        it('should call drawer close method', () => {
            component.closeSideNav();

            verify(mockMatDrawer.close()).once();
            expect().nothing();
        });
    });
});
