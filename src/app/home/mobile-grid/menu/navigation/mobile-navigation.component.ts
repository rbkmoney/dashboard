import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import isObject from 'lodash-es/isObject';

import { ComponentChanges } from '@dsh/type-utils';
import { isNil } from '@dsh/utils';

import { isParentFlatNode } from '../../types/is-parent-flat-node';
import { NavigationFlatNode } from '../../types/navigation-flat-node';
import { NavigationFlatNodeParent } from '../../types/navigation-flat-node-parent';

@Component({
    selector: 'dsh-mobile-navigation',
    templateUrl: './mobile-navigation.component.html',
    styleUrls: ['./mobile-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigationComponent implements OnChanges {
    @Input() menu: NavigationFlatNode[];
    @Input() activeId: string;

    @Output() navigationChanged = new EventEmitter<void>();

    treeControl = new FlatTreeControl<NavigationFlatNode>(
        (node: NavigationFlatNode) => node.level,
        (node: NavigationFlatNode) => isParentFlatNode(node)
    );

    ngOnChanges(changes: ComponentChanges<MobileNavigationComponent>): void {
        if (isObject(changes.activeId) || isObject(changes.menu)) {
            this.openActiveNodeParents();
        }
    }

    isExpandableNode(_: number, node: NavigationFlatNode): boolean {
        return isParentFlatNode(node);
    }

    hasNodeIcon(node: NavigationFlatNode): boolean {
        if (isParentFlatNode(node)) {
            return false;
        }

        return Boolean(node?.meta?.icon);
    }

    hasNodeLink(node: NavigationFlatNode): boolean {
        return isParentFlatNode(node) ? false : Boolean(node?.meta?.path);
    }

    shouldDisplayNode(node: NavigationFlatNode): boolean {
        let parent = this.getParentNode(node);
        while (parent) {
            if (!parent.isExpanded) {
                return false;
            }
            parent = this.getParentNode(parent);
        }
        return true;
    }

    toggleNode(node: NavigationFlatNode): void {
        if (isParentFlatNode(node)) {
            node.isExpanded = !node.isExpanded;
        }
    }

    navigated(): void {
        this.navigationChanged.emit();
    }

    isNodeActive(node: NavigationFlatNode): boolean {
        return node.id === this.activeId;
    }

    private getParentNode(node: NavigationFlatNode): NavigationFlatNodeParent | null {
        const nodeIndex = this.menu.indexOf(node);

        for (let i = nodeIndex - 1; i >= 0; i -= 1) {
            if (this.menu[i].level === node.level - 1) {
                return this.menu[i] as NavigationFlatNodeParent;
            }
        }

        return null;
    }

    private openActiveNodeParents(): void {
        if (isNil(this.menu) || isNil(this.activeId)) {
            return;
        }

        const activeNode = this.menu.find(({ id }: NavigationFlatNode) => id === this.activeId);
        const parents = [];
        let parentNode = this.getParentNode(activeNode);

        while (!isNil(parentNode)) {
            parents.push(parentNode);
            parentNode = this.getParentNode(parentNode);
        }

        this.menu.forEach((menuNode: NavigationFlatNode) => {
            if (isParentFlatNode(menuNode)) {
                menuNode.isExpanded = false;
            }
        });

        parents.forEach((node: NavigationFlatNodeParent) => {
            node.isExpanded = true;
        });
    }
}
