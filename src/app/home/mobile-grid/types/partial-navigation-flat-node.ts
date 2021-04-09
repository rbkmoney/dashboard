import { NavigationFlatNodeParent } from './navigation-flat-node-parent';
import { PartialNavigationFlatNodeLeaf } from './partial-navigation-flat-node-leaf';

export type PartialNavigationFlatNode = NavigationFlatNodeParent | PartialNavigationFlatNodeLeaf;
