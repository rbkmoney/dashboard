import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';

import { ExpansionService } from './expansion.service';

describe('ExpansionService', () => {
    let service: ExpansionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ExpansionService],
        });

        service = TestBed.inject(ExpansionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be init', () => {
        expect(service.expanded$).toBeObservable(cold('(a)', { a: false }));
    });

    describe('setExpanded', () => {
        it('should be emit', () => {
            service.setExpanded(true);
            expect(service.expanded$).toBeObservable(cold('(a)', { a: true }));
            service.setExpanded(false);
            expect(service.expanded$).toBeObservable(cold('(a)', { a: false }));
            service.setExpanded(false);
            expect(service.expanded$).toBeObservable(cold('(a)', { a: false }));
        });
    });

    describe('toggle', () => {
        it('should be toggle', () => {
            service.toggle();
            expect(service.expanded$).toBeObservable(cold('(a)', { a: true }));
            service.toggle();
            expect(service.expanded$).toBeObservable(cold('(a)', { a: false }));
        });
    });
});
