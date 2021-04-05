import { NavigationFlatNode } from './navigation-flat-node';
import { NavigationFlatNodeParent } from './navigation-flat-node-parent';
import { PartialNavigationFlatNode } from './partial-navigation-flat-node';

export function isParentFlatNode(
    node: NavigationFlatNode | PartialNavigationFlatNode
): node is NavigationFlatNodeParent {
    // eslint-disable-next-line no-prototype-builtins
    return node.hasOwnProperty('isExpanded');
}
