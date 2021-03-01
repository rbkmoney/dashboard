import isArray from 'lodash.isarray';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';

import { PAGE_POSITION_INDEX, ROOT_ROUTE_PATH, SECTION_POSITION_INDEX, SUBSECTION_POSITION_INDEX } from '../consts';
import { NavigationLink } from '../types/navigation-link';

const NO_MATCH_LEVEL = 0;
const PAGE_MATCH_LEVEL = 1;
const SECTION_MATCH_LEVEL = 2;
const SUBSECTION_MATCH_LEVEL = 3;

export const findActiveNavLink = (urlSegments: string[], links: NavigationLink[]): NavigationLink => {
    const pageSegment = urlSegments[PAGE_POSITION_INDEX];
    const sectionSegment = urlSegments[SECTION_POSITION_INDEX];
    const subsectionSegment = urlSegments[SUBSECTION_POSITION_INDEX];

    if (isEmpty(urlSegments)) {
        return links.find((link: NavigationLink) => link.path === ROOT_ROUTE_PATH);
    }

    const activeLink = links
        .map((link: NavigationLink) => {
            const { page, section, subsection } = link.navPlace;

            const isSamePage = isArray(page)
                ? (page as string[]).some((path: string) => path === pageSegment)
                : page === pageSegment;
            const isSameSection = section === sectionSegment;
            const isSameSubsection = subsection === subsectionSegment;

            if (isNil(section) || isNil(sectionSegment)) {
                return {
                    matchLevel: isSamePage ? PAGE_MATCH_LEVEL : NO_MATCH_LEVEL,
                    link,
                };
            }

            if (isNil(subsection) || isNil(subsectionSegment)) {
                return {
                    matchLevel: isSamePage && isSameSection ? SECTION_MATCH_LEVEL : NO_MATCH_LEVEL,
                    link,
                };
            }

            return {
                matchLevel: isSamePage && isSameSection && isSameSubsection ? SUBSECTION_MATCH_LEVEL : NO_MATCH_LEVEL,
                link,
            };
        })
        .filter(({ matchLevel }: { matchLevel: number; link: NavigationLink }) => matchLevel > NO_MATCH_LEVEL)
        .sort((a: { matchLevel: number; link: NavigationLink }, b: { matchLevel: number; link: NavigationLink }) =>
            a.matchLevel >= b.matchLevel ? 1 : -1
        )
        .pop();

    if (isNil(activeLink)) {
        return null;
    }

    return activeLink.link;
};
