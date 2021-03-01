import isArray from 'lodash.isarray';
import isNil from 'lodash.isnil';

import { ROOT_NODE_LEVEL } from '../consts';
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

        processingNodes.forEach(
            (node: PartialNavigationNode & { level: number; isExpanded?: boolean }, index: number) => {
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

                    (node as any).isExpanded = false;
                    delete (node as PartialNavigationGroup).children;
                }
            }
        );
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
                      meta,
                  };
        }
    );
}
