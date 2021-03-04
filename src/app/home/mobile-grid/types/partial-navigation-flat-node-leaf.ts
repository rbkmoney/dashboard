import { NavigationFlatNodeLeaf } from './navigation-flat-node-leaf';
import { NavigationLinkNodeMeta } from './navigation-link-node-meta';

export type PartialNavigationFlatNodeLeaf = Omit<NavigationFlatNodeLeaf, 'meta'> & {
    meta?: { icon?: NavigationLinkNodeMeta['icon'] };
};
