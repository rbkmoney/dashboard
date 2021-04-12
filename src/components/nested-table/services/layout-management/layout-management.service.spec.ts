import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { LayoutManagementService } from './layout-management.service';

describe('LayoutManagementService', () => {
    let service: LayoutManagementService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LayoutManagementService],
        });

        service = TestBed.inject(LayoutManagementService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getFillCols', () => {
        it('should be return fill cols', () => {
            service.setLayoutColsCount(10);
            expect(service.getFillCols(of(6))).toBeObservable(cold('(a)', { a: new Array(4).fill('') }));
        });
    });

    describe('layoutColsCount$', () => {
        it('should be return layoutColsCount$', () => {
            service.setLayoutColsCount(10);
            expect(service.layoutColsCount$).toBeObservable(cold('(a)', { a: 10 }));
        });
    });

    describe('gridTemplateColumns$', () => {
        it('should be return default', () => {
            service.setLayoutColsCount(5);
            expect(service.gridTemplateColumns$).toBeObservable(cold('(a)', { a: '1fr 1fr 1fr 1fr 1fr' }));
        });

        it('should be return by set', () => {
            service.setRowsGridTemplateColumns('1fr 100%');
            service.setLayoutColsCount(5);
            expect(service.gridTemplateColumns$).toBeObservable(cold('(a)', { a: '1fr 100%' }));
        });
    });
});
