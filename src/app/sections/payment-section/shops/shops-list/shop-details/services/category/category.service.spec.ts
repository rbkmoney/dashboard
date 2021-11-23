import { TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, of, scheduled } from 'rxjs';

import { Category } from '@dsh/api-codegen/capi/swagger-codegen';
import { CategoriesService } from '@dsh/api/categories';

import { makeEmptyList } from '../../../../tests/make-empty-list';
import { CategoryService } from './category.service';

class MockCategoriesService {
    categories$: Observable<Category[]>;

    constructor(categories: Category[]) {
        this.categories$ = scheduled(of(categories), getTestScheduler());
    }
}

describe('CategoryService', () => {
    let service: CategoryService;

    describe('creation', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    CategoryService,
                    {
                        provide: CategoriesService,
                        useValue: new MockCategoriesService([]),
                    },
                ],
            });
            service = TestBed.inject(CategoryService);
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('updateID', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    CategoryService,
                    {
                        provide: CategoriesService,
                        useValue: new MockCategoriesService(
                            makeEmptyList(20).map((_: null, index: number) => {
                                return {
                                    categoryID: index,
                                    name: `My Category #${index + 1}`,
                                };
                            })
                        ),
                    },
                ],
            });
            service = TestBed.inject(CategoryService);

            service.category$.subscribe();
        });

        it('should change category$ value', () => {
            const expected$ = cold('a', {
                a: {
                    categoryID: 5,
                    name: `My Category #6`,
                },
            });

            service.updateID(5);
            expect(service.category$).toBeObservable(expected$);
        });

        it('should return null value in category$ observable if id was not found', () => {
            const expected$ = cold('a', {
                a: undefined,
            });

            service.updateID(4050);

            expect(service.category$).toBeObservable(expected$);
        });
    });
});
