import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { NavigationLink, NavigationService } from '../navigation';
import { MOBILE_MENU_TOKEN } from './consts';
import { isParentFlatNode } from './types/is-parent-flat-node';
import { NavigationFlatNode } from './types/navigation-flat-node';
import { NavigationFlatNodeParent } from './types/navigation-flat-node-parent';
import { PartialNavigationFlatNode } from './types/partial-navigation-flat-node';
import { PartialNavigationFlatNodeLeaf } from './types/partial-navigation-flat-node-leaf';
import { PartialNavigationNode } from './types/partial-navigation-node';
import { getFlattenMobileMenu } from './utils/get-flatten-mobile-menu';

@Component({
    selector: 'dsh-mobile-grid',
    templateUrl: './mobile-grid.component.html',
    styleUrls: ['./mobile-grid.component.scss'],
})
export class MobileGridComponent implements OnInit {
    @Input()
    @coerceBoolean
    inverted: boolean;

    @ViewChild(MatDrawer) drawer: MatDrawer;

    menu$: Observable<NavigationFlatNode[]>;
    activeMenuItemId$: Observable<NavigationFlatNode['id']>;

    private mobileMenuFormat: PartialNavigationFlatNode[];

    constructor(
        private navigationService: NavigationService,
        @Inject(MOBILE_MENU_TOKEN)
        private mobileMenu: PartialNavigationNode[]
    ) {}

    get menuIcon(): string {
        return this.inverted ? 'menu_inverted' : 'menu';
    }

    ngOnInit(): void {
        this.mobileMenuFormat = getFlattenMobileMenu(this.mobileMenu);
        this.activeMenuItemId$ = this.navigationService.activeLink$.pipe(map((link: NavigationLink) => link.id));
        this.menu$ = this.navigationService.availableLinks$.pipe(
            map((links: NavigationLink[]) => {
                return links.reduce((linksMap: Map<string, NavigationLink>, link: NavigationLink) => {
                    linksMap.set(link.id, link);
                    return linksMap;
                }, new Map());
            }),
            map((linksMap: Map<string, NavigationLink>) => {
                const flatMenuNodes = this.mobileMenuFormat
                    .filter(
                        (menuNode: PartialNavigationFlatNode) => linksMap.has(menuNode.id) || isParentFlatNode(menuNode)
                    )
                    .map((menuNode: PartialNavigationFlatNode) => {
                        if (isParentFlatNode(menuNode)) {
                            return menuNode as NavigationFlatNodeParent;
                        }

                        const { path } = linksMap.get(menuNode.id);
                        const { meta = {} } = menuNode as PartialNavigationFlatNodeLeaf;
                        return {
                            ...menuNode,
                            meta: {
                                ...meta,
                                path,
                            },
                        };
                    });
                return flatMenuNodes.filter((menuNode: NavigationFlatNode, index: number) => {
                    if (isParentFlatNode(menuNode)) {
                        const nextNode = flatMenuNodes[index + 1];
                        return !(isNil(nextNode) || nextNode.level <= menuNode.level);
                    }
                    return true;
                });
            })
        );
    }

    openSideNav(): void {
        this.drawer.open('program');
    }

    closeSideNav(): void {
        this.drawer.close();
    }
}
