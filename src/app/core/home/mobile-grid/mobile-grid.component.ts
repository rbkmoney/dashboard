import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavigationLink, NavigationService } from '../navigation';
import { MOBILE_MENU } from './consts';
import { NavigationFlatNode } from './types/navigation-flat-node';
import { PartialNavigationFlatNode } from './types/partial-navigation-flat-node';
import { getFlattenMobileMenu } from './utils/get-flatten-mobile-menu';

@Component({
    selector: 'dsh-mobile-grid',
    templateUrl: './mobile-grid.component.html',
    styleUrls: ['./mobile-grid.component.scss'],
})
export class MobileGridComponent implements OnInit {
    @Input() invertedLogo: boolean;
    @Input() brandType;

    @ViewChild(MatDrawer) drawer: MatDrawer;

    menu$: Observable<NavigationFlatNode[]>;
    activeMenuItem$: Observable<NavigationFlatNode['id']>;

    private mobileMenuFormat: PartialNavigationFlatNode[] = getFlattenMobileMenu(MOBILE_MENU);

    constructor(private navigationService: NavigationService) {}

    ngOnInit(): void {
        this.menu$ = this.navigationService.availableLinks$.pipe(
            map((links: NavigationLink[]) => {
                return links.reduce((linksMap: Map<string, NavigationLink>, link: NavigationLink) => {
                    linksMap.set(link.id, link);
                    return linksMap;
                }, new Map());
            }),
            map((linksMap: Map<string, NavigationLink>) => {
                return this.mobileMenuFormat
                    .filter(({ id }: PartialNavigationFlatNode) => linksMap.has(id))
                    .map((menuNavNode: PartialNavigationFlatNode) => {
                        const { path, activateStartPaths } = linksMap.get(menuNavNode.id);
                        return {
                            ...menuNavNode,
                            meta: {
                                ...menuNavNode.meta,
                                path,
                                activateStartPaths,
                            },
                        };
                    });
            })
        );
    }

    get menuIcon(): string {
        return this.invertedLogo ? 'menu_inverted' : 'menu';
    }

    get isOpen(): boolean {
        return this.drawer?.opened ?? false;
    }

    openSideNav(): void {
        this.drawer.open('program');
    }

    closeSideNav() {
        this.drawer.close();
    }
}
