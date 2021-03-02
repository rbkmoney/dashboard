import { PartialNavigationNode } from './partial-navigation-node';

export interface PartialNavigationGroup {
    id: string;
    children: PartialNavigationNode[];
}
