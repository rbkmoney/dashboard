import { BaseNavigationFlatNode } from './base-navigation-flat-node';
import { NavigationLinkNodeMeta } from './navigation-link-node-meta';

export interface NavigationFlatNodeLeaf extends BaseNavigationFlatNode {
    meta?: NavigationLinkNodeMeta;
}
