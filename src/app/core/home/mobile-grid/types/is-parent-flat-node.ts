import { NavigationFlatNode } from './navigation-flat-node';
import { NavigationFlatNodeParent } from './navigation-flat-node-parent';

export function isParentFlatNode(node: NavigationFlatNode): node is NavigationFlatNodeParent {
    return node.hasOwnProperty('isExpanded');
}
