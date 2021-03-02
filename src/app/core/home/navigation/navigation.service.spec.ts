import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { anything, instance, mock, when } from 'ts-mockito';

import { PaymentInstitutionRealm, WalletService } from '@dsh/api';

import { MENU_LINKS_TOKEN, REALM_TYPE, ROOT_ROUTE_PATH } from './consts';
import { NavigationService } from './navigation.service';
import { NavigationLink } from './types/navigation-link';
import { NavigationSections } from './types/navigation-sections';

describe('NavigationService', () => {
    let service: NavigationService;
    let mockWalletService: WalletService;
    let mockRouter: Router;

    function createService(links: NavigationLink[]) {
        TestBed.configureTestingModule({
            providers: [
                NavigationService,
                {
                    provide: WalletService,
                    useFactory: () => instance(mockWalletService),
                },
                {
                    provide: Router,
                    useFactory: () => instance(mockRouter),
                },
                {
                    provide: MENU_LINKS_TOKEN,
                    useValue: links,
                },
            ],
        });
        service = TestBed.inject(NavigationService);
    }

    beforeEach(() => {
        mockWalletService = mock(WalletService);
        mockRouter = mock(Router);
    });

    beforeEach(() => {
        when(mockRouter.url).thenReturn('test_url');
        when(mockRouter.events).thenReturn(of());
        when(mockRouter.parseUrl(anything())).thenReturn({
            root: {
                children: {
                    primary: null,
                },
            },
        } as any);
        when(mockWalletService.hasWallets$).thenReturn(of());
    });

    it('should be created', () => {
        createService([]);
        expect(service).toBeTruthy();
    });

    describe('availableLinks$', () => {
        beforeEach(() => {
            when(mockWalletService.hasWallets$).thenReturn(of(true));
        });

        it('should filter wallets links if wallets are not available', () => {
            when(mockWalletService.hasWallets$).thenReturn(of(false));
            createService([
                {
                    id: NavigationSections.wallets,
                    path: 'wallets',
                    navPlace: {
                        page: 'wallets',
                    },
                },
                {
                    id: 'mine',
                    path: 'mine',
                    navPlace: {
                        page: 'mine',
                    },
                },
            ]);

            expect(service.availableLinks$).toBeObservable(
                cold('(a|)', {
                    a: [
                        {
                            id: 'mine',
                            path: 'mine',
                            navPlace: {
                                page: 'mine',
                            },
                        },
                    ],
                })
            );
        });

        it('should return links as is if wallets is available', () => {
            when(mockWalletService.hasWallets$).thenReturn(of(true));

            createService([
                {
                    id: NavigationSections.wallets,
                    path: 'wallets',
                    navPlace: {
                        page: 'wallets',
                    },
                },
                {
                    id: 'mine',
                    path: 'mine',
                    navPlace: {
                        page: 'mine',
                    },
                },
            ]);

            expect(service.availableLinks$).toBeObservable(
                cold('(a|)', {
                    a: [
                        {
                            id: NavigationSections.wallets,
                            path: 'wallets',
                            navPlace: {
                                page: 'wallets',
                            },
                        },
                        {
                            id: 'mine',
                            path: 'mine',
                            navPlace: {
                                page: 'mine',
                            },
                        },
                    ],
                })
            );
        });

        it('should replace realm type using existing realm from url', () => {
            when(mockRouter.url).thenReturn('/home/realm/live/section/subsection');

            createService([
                {
                    id: 'mine_realm',
                    path: `/mine/realm/${REALM_TYPE}/section`,
                    navPlace: {
                        page: 'mine',
                        section: 'section',
                    },
                },
                {
                    id: 'mine',
                    path: 'mine',
                    navPlace: {
                        page: 'mine',
                    },
                },
            ]);

            expect(service.availableLinks$).toBeObservable(
                cold('(a|)', {
                    a: [
                        {
                            id: 'mine_realm',
                            path: `/mine/realm/live/section`,
                            navPlace: {
                                page: 'mine',
                                section: 'section',
                            },
                        },
                        {
                            id: 'mine',
                            path: 'mine',
                            navPlace: {
                                page: 'mine',
                            },
                        },
                    ],
                })
            );
        });

        it('should replace realm type using live if realm does not set in url', () => {
            when(mockRouter.url).thenReturn('/');

            createService([
                {
                    id: 'mine_realm',
                    path: `/mine/realm/${REALM_TYPE}/section`,
                    navPlace: {
                        page: 'mine',
                        section: 'section',
                    },
                },
                {
                    id: 'mine',
                    path: 'mine',
                    navPlace: {
                        page: 'mine',
                    },
                },
            ]);

            expect(service.availableLinks$).toBeObservable(
                cold('(a|)', {
                    a: [
                        {
                            id: 'mine_realm',
                            path: `/mine/realm/${PaymentInstitutionRealm.live}/section`,
                            navPlace: {
                                page: 'mine',
                                section: 'section',
                            },
                        },
                        {
                            id: 'mine',
                            path: 'mine',
                            navPlace: {
                                page: 'mine',
                            },
                        },
                    ],
                })
            );
        });
    });

    describe('activeLink$', () => {
        beforeEach(() => {
            when(mockWalletService.hasWallets$).thenReturn(of(true));
        });

        it('should return link that match current url', () => {
            when(mockRouter.url).thenReturn('/mine');
            when(mockRouter.parseUrl('/mine')).thenReturn({
                root: {
                    children: {
                        primary: {
                            segments: [{ path: 'mine' }],
                        },
                    },
                },
            } as any);

            createService([
                {
                    id: 'root',
                    path: ROOT_ROUTE_PATH,
                    navPlace: { page: ROOT_ROUTE_PATH },
                },
                {
                    id: 'mine_realm',
                    path: `/mine/realm/${REALM_TYPE}/section`,
                    navPlace: {
                        page: 'mine',
                        section: 'section',
                    },
                },
                {
                    id: 'mine',
                    path: 'mine',
                    navPlace: {
                        page: 'mine',
                    },
                },
            ]);

            expect(service.activeLink$).toBeObservable(
                cold('(a|)', {
                    a: {
                        id: 'mine',
                        path: 'mine',
                        navPlace: {
                            page: 'mine',
                        },
                    },
                })
            );
        });

        it('should return link with root path if there is no valid link for current url', () => {
            when(mockRouter.url).thenReturn('/idk');
            when(mockRouter.parseUrl('/idk')).thenReturn({
                root: {
                    children: {
                        primary: {
                            segments: [{ path: 'idk' }],
                        },
                    },
                },
            } as any);

            createService([
                {
                    id: 'root',
                    path: ROOT_ROUTE_PATH,
                    navPlace: { page: ROOT_ROUTE_PATH },
                },
                {
                    id: 'mine_realm',
                    path: `/mine/realm/${REALM_TYPE}/section`,
                    navPlace: {
                        page: 'mine',
                        section: 'section',
                    },
                },
                {
                    id: 'mine',
                    path: 'mine',
                    navPlace: {
                        page: 'mine',
                    },
                },
            ]);

            expect(service.activeLink$).toBeObservable(
                cold('(a|)', {
                    a: {
                        id: 'root',
                        path: ROOT_ROUTE_PATH,
                        navPlace: { page: ROOT_ROUTE_PATH },
                    },
                })
            );
        });
    });
});
