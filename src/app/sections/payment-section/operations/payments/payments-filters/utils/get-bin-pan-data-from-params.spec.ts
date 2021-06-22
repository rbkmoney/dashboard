import { getBinPanDataFromParams } from './get-bin-pan-data-from-params';

describe('getBinPanDataFromParams', () => {
    it('should return valid bin pan as is', () => {
        expect(
            getBinPanDataFromParams({
                first6: '123456',
                last4: '1234',
            })
        ).toEqual({
            bin: '123456',
            pan: '1234',
        });
    });

    it('should return null instead of bin if bin length is not valid', () => {
        expect(
            getBinPanDataFromParams({
                first6: '1256',
                last4: '1234',
            })
        ).toEqual({
            bin: null,
            pan: '1234',
        });
    });

    it('should return null instead of pan if pan length is not valid', () => {
        expect(
            getBinPanDataFromParams({
                first6: '123456',
                last4: '124',
            })
        ).toEqual({
            bin: '123456',
            pan: null,
        });
    });

    it('should return null instead of value if value is a string that cannot be parsed in number', () => {
        expect(
            getBinPanDataFromParams({
                first6: '12345,',
                last4: '1234',
            })
        ).toEqual({
            bin: null,
            pan: '1234',
        });
    });

    it('should return null instead of value if value was not provided', () => {
        expect(
            getBinPanDataFromParams({
                last4: '1234',
            })
        ).toEqual({
            bin: null,
            pan: '1234',
        });
    });

    it('should return null if both of params are invalid', () => {
        expect(
            getBinPanDataFromParams({
                first6: '12345,',
                last4: ',234',
            })
        ).toBeNull();
    });

    it('should return null if both of params was not provided', () => {
        expect(getBinPanDataFromParams({})).toBeNull();
    });
});
