import { findActiveNavLink } from './find-active-nav-link';

describe('findActiveNavLink', () => {
    it('should return the deepest matched link', () => {
        expect(
            findActiveNavLink(
                ['page', 'realm', 'live', 'section', 'subsection'],
                [
                    {
                        id: 'home',
                        path: '/',
                        navPlace: { page: '/' },
                    },
                    {
                        id: 'not_find_one',
                        path: '/page/realm/any/section/another_section',
                        navPlace: {
                            page: 'page',
                            section: 'section',
                            subsection: 'another_section',
                        },
                    },
                    {
                        id: 'find',
                        path: '/page/realm/any/section/subsection',
                        navPlace: {
                            page: 'page',
                            section: 'section',
                            subsection: 'subsection',
                        },
                    },
                    {
                        id: 'not_find_two',
                        path: '/page/realm/any/section/another_section_two',
                        navPlace: {
                            page: 'page',
                            section: 'section',
                            subsection: 'another_section',
                        },
                    },
                ]
            )
        ).toEqual({
            id: 'find',
            path: '/page/realm/any/section/subsection',
            navPlace: {
                page: 'page',
                section: 'section',
                subsection: 'subsection',
            },
        });
    });

    it('should return null if there is no url segments was provided', () => {
        expect(
            findActiveNavLink(
                [],
                [
                    {
                        id: 'home',
                        path: '/',
                        navPlace: { page: '/' },
                    },
                ]
            )
        ).toBeNull();
    });

    it('should return null if there is no valid active url was found', () => {
        expect(
            findActiveNavLink(
                ['home'],
                [
                    {
                        id: 'root',
                        path: '/',
                        navPlace: { page: '/' },
                    },
                ]
            )
        ).toBeNull();
    });
});
