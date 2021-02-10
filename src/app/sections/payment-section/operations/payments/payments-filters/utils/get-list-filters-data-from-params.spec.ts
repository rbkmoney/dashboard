import { getListFiltersDataFromParams } from './get-list-filters-data-from-params';

describe('getListFiltersDataFromParams', () => {
    it('should return list params as arrays', () => {
        expect(
            getListFiltersDataFromParams({
                shopIDs: ['shopID_1', 'shopID_2'],
                invoiceIDs: ['invoiceID_1', 'invoiceID_2'],
            })
        ).toEqual({
            shopIDs: ['shopID_1', 'shopID_2'],
            invoiceIDs: ['invoiceID_1', 'invoiceID_2'],
        });
    });

    it('should wrap string param in array', () => {
        expect(
            getListFiltersDataFromParams({
                shopIDs: 'shopID_1',
                invoiceIDs: 'invoiceID_1',
            })
        ).toEqual({
            shopIDs: ['shopID_1'],
            invoiceIDs: ['invoiceID_1'],
        });
    });

    it('should ignore empty arrays params', () => {
        expect(
            getListFiltersDataFromParams({
                shopIDs: ['shopID_1', 'shopID_2'],
                invoiceIDs: [],
            })
        ).toEqual({
            shopIDs: ['shopID_1', 'shopID_2'],
        });
    });

    it('should ignore empty strings params', () => {
        expect(
            getListFiltersDataFromParams({
                shopIDs: '',
                invoiceIDs: 'invoiceID_1',
            })
        ).toEqual({
            invoiceIDs: ['invoiceID_1'],
        });
    });

    it('should work with combined params', () => {
        expect(
            getListFiltersDataFromParams({
                shopIDs: 'shopID_1',
                invoiceIDs: ['invoiceID_1', 'invoiceID_2'],
            })
        ).toEqual({
            shopIDs: ['shopID_1'],
            invoiceIDs: ['invoiceID_1', 'invoiceID_2'],
        });
    });
});
