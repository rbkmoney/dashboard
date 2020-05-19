import { coerce } from './coerce';

describe('coerce', () => {
    class Simple {
        @coerce(function (v) {
            return this.withDef + v;
        })
        testThisBefore = 1;

        @coerce((v) => v + 1)
        withDef = 0;

        @coerce((v) => v + 1)
        withoutDef;

        @coerce(function (v) {
            return this.withDef + v;
        })
        testThisAfter = 1;
    }

    it("without default init shouldn't call", () => {
        const simple = new Simple();
        expect(simple.withoutDef).toBeUndefined();
    });

    it('with default init should call', () => {
        const simple = new Simple();
        expect(simple.withDef).toBe(1);
    });

    it('init order should affects usage this (before)', () => {
        const simple = new Simple();
        expect(simple.testThisBefore).toBeNaN();
    });

    it('init order should affects usage this (after)', () => {
        const simple = new Simple();
        expect(simple.testThisAfter).toBe(2);
    });
});
