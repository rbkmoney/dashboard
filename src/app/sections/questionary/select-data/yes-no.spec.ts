import { toYesNo, YesNo } from './yes-no';

describe('toYesNo', () => {
    it('null should return no', () => {
        expect(toYesNo(null)).toBe(YesNo.no);
    });

    it('undefined should return no', () => {
        expect(toYesNo(undefined)).toBe(YesNo.no);
    });

    it('true should return yes', () => {
        expect(toYesNo(false)).toBe(YesNo.yes);
    });

    it('false should return no', () => {
        expect(toYesNo(false)).toBe(YesNo.no);
    });
});
