import { TestBed } from '@angular/core/testing';

import { generateMockShopsItemList } from '../../tests/generate-mock-shops-item-list';
import { generateMockShopItem } from '../../tests/generate-shop-item';
import { ShopItem } from '../../types/shop-item';
import { ShopsFiltersService } from './shops-filters.service';

describe('ShopsFiltersService', () => {
    let service: ShopsFiltersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ShopsFiltersService],
        });
        service = TestBed.inject(ShopsFiltersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('filterShops', () => {
        let list: ShopItem[];
        let expected: ShopItem[];

        it('should return full list if filter data is empty', () => {
            list = generateMockShopsItemList(20);

            expect(service.filterShops(list, {})).toEqual(list);
        });

        describe('query', () => {
            it('should filter by query contain in names', () => {
                expected = [
                    {
                        ...generateMockShopItem(111),
                        details: {
                            name: 'MyName1',
                        },
                    },
                    {
                        ...generateMockShopItem(112),
                        details: {
                            name: 'MyName2',
                        },
                    },
                    {
                        ...generateMockShopItem(113),
                        details: {
                            name: 'MyName3',
                        },
                    },
                ];
                list = [...generateMockShopsItemList(20), ...expected];

                expect(service.filterShops(list, { query: 'MyName' })).toEqual(expected);
            });

            it('should filter by query contain in ids', () => {
                expected = [
                    {
                        ...generateMockShopItem(111),
                        id: 'my_awesome_id_1',
                    },
                    {
                        ...generateMockShopItem(112),
                        id: 'my_awesome_id_2',
                    },
                    {
                        ...generateMockShopItem(113),
                        id: 'my_awesome_id_3',
                    },
                ];
                list = [...generateMockShopsItemList(20), ...expected];

                expect(service.filterShops(list, { query: 'my_awesome_id' })).toEqual(expected);
            });

            it('should combine names and ids containing query', () => {
                expected = [
                    {
                        ...generateMockShopItem(111),
                        id: 'my_awesome_id_1',
                    },
                    {
                        ...generateMockShopItem(112),
                        id: 'my_awesome_id_2',
                    },
                    {
                        ...generateMockShopItem(113),
                        id: 'my_awesome_id_3',
                    },
                    {
                        ...generateMockShopItem(111),
                        details: {
                            name: 'my_awesome_name_1',
                        },
                    },
                    {
                        ...generateMockShopItem(112),
                        details: {
                            name: 'my_awesome_name_2',
                        },
                    },
                    {
                        ...generateMockShopItem(113),
                        details: {
                            name: 'my_awesome_name_3',
                        },
                    },
                ];
                list = [...generateMockShopsItemList(20), ...expected];

                expect(service.filterShops(list, { query: 'my_awesome' })).toEqual(expected);
            });

            it('should return full list if query is empty', () => {
                list = generateMockShopsItemList(20);

                expect(service.filterShops(list, { query: '' })).toEqual(list);
            });
        });
    });
});
