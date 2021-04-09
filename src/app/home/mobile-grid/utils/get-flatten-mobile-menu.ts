import isArray from 'lodash-es/isArray';
import isNil from 'lodash-es/isNil';

import { ROOT_NODE_LEVEL } from '../consts';
import { NavigationFlatNodeParent } from '../types/navigation-flat-node-parent';
import { NavigationLinkNodeMeta } from '../types/navigation-link-node-meta';
import { PartialNavigationFlatNode } from '../types/partial-navigation-flat-node';
import { PartialNavigationGroup } from '../types/partial-navigation-group';
import { PartialNavigationLeaf } from '../types/partial-navigation-leaf';
import { PartialNavigationNode } from '../types/partial-navigation-node';

export function getFlattenMobileMenu(menu: PartialNavigationNode[]): PartialNavigationFlatNode[] {
    const flatNodes = menu.map((el: PartialNavigationNode) => {
        return {
            ...el,
            level: ROOT_NODE_LEVEL,
        };
    });
    let hasUnhandledChildren = true;

    while (hasUnhandledChildren) {
        const processingNodes = flatNodes.slice();
        hasUnhandledChildren = false;

        for (let index = 0; index < processingNodes.length; index += 1) {
            const node: PartialNavigationNode & { level: number; isExpanded?: boolean } = processingNodes[index];
            const children = (node as PartialNavigationGroup).children;

            if (isArray(children)) {
                hasUnhandledChildren = true;
                const childNodes = children.map((child: PartialNavigationNode) => {
                    return {
                        ...child,
                        level: node.level + 1,
                    };
                });
                flatNodes.splice(index + 1, 0, ...childNodes);

                (node as NavigationFlatNodeParent).isExpanded = false;
                delete (node as PartialNavigationGroup).children;
                break;
            }
        }
    }

    return flatNodes.map(
        ({ id, level, isExpanded, icon }: PartialNavigationLeaf & { level: number; isExpanded?: boolean }) => {
            const meta = isNil(icon) ? {} : ({ icon } as Partial<NavigationLinkNodeMeta>);

            return isNil(isExpanded)
                ? {
                      id,
                      level,
                      meta,
                  }
                : {
                      id,
                      level,
                      isExpanded,
                  };
        }
    );
}
