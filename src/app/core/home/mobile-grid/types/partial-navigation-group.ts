import { PartialNavigationLeaf } from './partial-navigation-leaf';

export interface PartialNavigationGroup {
    id: string;
    children: PartialNavigationLeaf[];
}
