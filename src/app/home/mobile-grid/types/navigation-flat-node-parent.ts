import { BaseNavigationFlatNode } from './base-navigation-flat-node';

export interface NavigationFlatNodeParent extends BaseNavigationFlatNode {
    isExpanded: boolean;
}
