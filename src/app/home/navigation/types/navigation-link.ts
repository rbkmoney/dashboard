import { NavigationLinkSections } from './navigation-link-sections';

export interface NavigationLink {
    id: string;
    path: string;
    navPlace: NavigationLinkSections;
}
