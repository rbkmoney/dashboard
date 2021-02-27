import { NavigationFlatNode } from './navigation-flat-node';
import { NavigationLinkNodeMeta } from './navigation-link-node-meta';

export type PartialNavigationFlatNode = Omit<NavigationFlatNode, 'meta'> & {
    meta: { icon?: NavigationLinkNodeMeta['icon'] };
};
