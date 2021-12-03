import { getTestScheduler } from 'jasmine-marbles';
import { Observable, of, scheduled } from 'rxjs';

export class MockActivatedRoute {
    fragment: Observable<string>;

    constructor(fragment: string) {
        this.fragment = scheduled(of(fragment), getTestScheduler());
    }
}
