import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { finalize } from 'rxjs/operators';

import { generateDatasetItems } from '@dsh/app/shared/services/list/generate-dataset-items';

import { DataCachingService, DataSetItemID } from './data-caching.service';

describe('DataCachingService', () => {
    class DataCached extends DataCachingService<any> {}

    let service: DataCached;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DataCachingService],
        });
        service = TestBed.inject(DataCachingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('items$', () => {
        it('should return current value after subscribe to observable of all cached items now', () => {
            const mockDatasetItems = generateDatasetItems(5);

            service.addElements(...mockDatasetItems.slice(0, 2));
            service.addElements(...mockDatasetItems.slice(2, 4));
            service.addElements(...mockDatasetItems.slice(4));

            expect(service.items$).toBeObservable(
                cold('a', {
                    a: mockDatasetItems,
                })
            );
        });
    });

    describe('addElements', () => {
        it('should add new elements in cache', () => {
            const mockDatasetItems = generateDatasetItems(5);

            hot('^--a-b--c|', {
                a: mockDatasetItems.slice(0, 2),
                b: mockDatasetItems.slice(2, 4),
                c: mockDatasetItems.slice(4),
            }).subscribe((items: DataSetItemID[]) => {
                service.addElements(...items);
            });

            expect(service.items$).toBeObservable(
                cold('a--b-c--d', {
                    a: [],
                    b: mockDatasetItems.slice(0, 2),
                    c: mockDatasetItems.slice(0, 4),
                    d: mockDatasetItems,
                })
            );
        });
    });

    describe('updateElements', () => {
        let mockItems: DataSetItemID[];

        beforeEach(() => {
            mockItems = generateDatasetItems(5);
            service.addElements(...mockItems);
        });

        it('should update single element', () => {
            const newItem = {
                id: mockItems[2].id,
            };
            hot('^--a|', {
                a: newItem,
            }).subscribe((item: DataSetItemID) => {
                service.updateElements(item);
            });

            const updatedList = mockItems.slice();
            updatedList.splice(2, 1, newItem);

            expect(service.items$).toBeObservable(
                cold('a--b', {
                    a: mockItems,
                    b: updatedList,
                })
            );
        });

        it('should not update element if it does not exist in cache list', () => {
            const newItem = {
                id: 'mock_item_10',
            };

            hot('^--a|', {
                a: newItem,
            }).subscribe((item: DataSetItemID) => {
                service.updateElements(item);
            });

            expect(service.items$).toBeObservable(
                cold('a--b', {
                    a: mockItems,
                    b: mockItems,
                })
            );
        });

        it('should update a few items in list', () => {
            const newItems = [
                {
                    id: mockItems[1].id,
                },
                {
                    id: mockItems[2].id,
                },
            ];

            hot('^--a|', {
                a: newItems,
            }).subscribe((items: DataSetItemID[]) => {
                service.updateElements(...items);
            });

            const updatedList = mockItems.slice();
            updatedList.splice(1, 2, ...newItems);

            expect(service.items$).toBeObservable(
                cold('a--b', {
                    a: mockItems,
                    b: updatedList,
                })
            );
        });

        it('should update only existing elements', () => {
            const newItems = [
                {
                    id: mockItems[1].id,
                },
                {
                    id: mockItems[2].id,
                },
                {
                    id: 'mock_item_10',
                },
            ];

            hot('^--a-b|', {
                a: newItems.slice(0, 1),
                b: newItems.slice(1),
            }).subscribe((items: DataSetItemID[]) => {
                service.updateElements(...items);
            });

            const updatedLists = {
                a: mockItems.slice(),
                b: mockItems.slice(),
            };
            updatedLists.a.splice(1, 1, newItems[0]);
            updatedLists.b.splice(2, 1, newItems[1]);

            expect(service.items$).toBeObservable(
                cold('a--b-c', {
                    a: mockItems,
                    b: updatedLists.a,
                    c: updatedLists.b,
                })
            );
        });
    });

    describe('clear', () => {
        it('should clear cache data', () => {
            const mockItems = generateDatasetItems(5);

            hot('^--a-b--c---|', {
                a: mockItems.slice(0, 2),
                b: mockItems.slice(2, 4),
                c: mockItems.slice(4),
            })
                .pipe(
                    finalize(() => {
                        service.clear();
                    })
                )
                .subscribe((items: DataSetItemID[]) => {
                    service.addElements(...items);
                });

            expect(service.items$).toBeObservable(
                cold('a--b-c--d---e', {
                    a: [],
                    b: mockItems.slice(0, 2),
                    c: mockItems.slice(0, 4),
                    d: mockItems,
                    e: [],
                })
            );
        });
    });
});
