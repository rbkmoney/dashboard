import isEmpty from 'lodash-es/isEmpty';

import { isNil } from '@dsh/utils';

import {
    PAGE_POSITION_INDEX,
    REALM_POSITION_INDEX,
    REALM_SECTION_POSITION_INDEX,
    REALM_SEGMENT,
    REALM_SUBSECTION_POSITION_INDEX,
    SECTION_POSITION_INDEX,
    SUBSECTION_POSITION_INDEX,
} from '../consts';
import { NavigationLink } from '../types/navigation-link';

const NO_MATCH_LEVEL = 0;
const PAGE_MATCH_LEVEL = 1;
const SECTION_MATCH_LEVEL = 2;
const SUBSECTION_MATCH_LEVEL = 3;

const findSectionsSegments = (urlSegments: string[]): [string | undefined, string | undefined] => {
    const realmSegment = urlSegments[REALM_POSITION_INDEX];
    let sectionSegment: string | undefined;
    let subsectionSegment: string | undefined;

    if (realmSegment === REALM_SEGMENT) {
        sectionSegment = urlSegments[REALM_SECTION_POSITION_INDEX];
        subsectionSegment = urlSegments[REALM_SUBSECTION_POSITION_INDEX];
    } else {
        sectionSegment = urlSegments[SECTION_POSITION_INDEX];
        subsectionSegment = urlSegments[SUBSECTION_POSITION_INDEX];
    }

    return [sectionSegment, subsectionSegment];
};

export const findActiveNavLink = (urlSegments: string[], links: NavigationLink[]): NavigationLink | null => {
    if (isEmpty(urlSegments)) {
        return null;
    }

    const pageSegment = urlSegments[PAGE_POSITION_INDEX];
    const [sectionSegment, subsectionSegment] = findSectionsSegments(urlSegments);

    const activeLink = links
        .map((link: NavigationLink) => {
            const { page, section, subsection } = link.navPlace;

            const isSamePage = Array.isArray(page)
                ? page.some((path: string) => path === pageSegment)
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
