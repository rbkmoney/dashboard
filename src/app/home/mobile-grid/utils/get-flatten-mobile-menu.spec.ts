import { getFlattenMobileMenu } from './get-flatten-mobile-menu';

describe('getFlattenMobileMenu', () => {
    it('should flat menu with no children', () => {
        expect(getFlattenMobileMenu([{ id: 'one' }, { id: 'two' }])).toEqual([
            { id: 'one', level: 0, meta: {} },
            { id: 'two', level: 0, meta: {} },
        ]);
    });

    it('should flat menu with one child level', () => {
        expect(
            getFlattenMobileMenu([
                { id: 'one' },
                {
                    id: 'two',
                    children: [{ id: 'two one' }, { id: 'two two' }],
                },
                { id: 'three' },
                { id: 'four' },
            ])
        ).toEqual([
            { id: 'one', level: 0, meta: {} },
            { id: 'two', level: 0, isExpanded: false },
            { id: 'two one', level: 1, meta: {} },
            { id: 'two two', level: 1, meta: {} },
            { id: 'three', level: 0, meta: {} },
            { id: 'four', level: 0, meta: {} },
        ]);
    });

    it('should flat menu with two child levels', () => {
        expect(
            getFlattenMobileMenu([
                { id: 'one' },
                {
                    id: 'two',
                    children: [
                        { id: 'two one' },
                        {
                            id: 'two two',
                            children: [{ id: 'two two one' }, { id: 'two two two' }, { id: 'two two three' }],
                        },
                        { id: 'two three' },
                    ],
                },
                {
                    id: 'three',
                    children: [{ id: 'three one' }, { id: 'three two' }, { id: 'three three' }],
                },
                { id: 'four' },
            ])
        ).toEqual([
            { id: 'one', level: 0, meta: {} },
            { id: 'two', level: 0, isExpanded: false },
            { id: 'two one', level: 1, meta: {} },
            { id: 'two two', level: 1, isExpanded: false },
            { id: 'two two one', level: 2, meta: {} },
            { id: 'two two two', level: 2, meta: {} },
            { id: 'two two three', level: 2, meta: {} },
            { id: 'two three', level: 1, meta: {} },
            { id: 'three', level: 0, isExpanded: false },
            { id: 'three one', level: 1, meta: {} },
            { id: 'three two', level: 1, meta: {} },
            { id: 'three three', level: 1, meta: {} },
            { id: 'four', level: 0, meta: {} },
        ]);
    });

    it('should add icon data in meta object', () => {
        expect(
            getFlattenMobileMenu([
                { id: 'one', icon: 'build' },
                { id: 'two', icon: 'description' },
            ])
        ).toEqual([
            { id: 'one', level: 0, meta: { icon: 'build' } },
            { id: 'two', level: 0, meta: { icon: 'description' } },
        ]);
    });
});
