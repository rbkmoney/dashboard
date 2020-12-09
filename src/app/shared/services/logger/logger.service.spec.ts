import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoggerService],
        });
        service = TestBed.inject(LoggerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('log', () => {
        it('should log text', () => {
            const message = 'My test Message';
            const spyOnConsole = spyOn(console, 'log');

            service.log(message);

            expect(spyOnConsole).toHaveBeenCalledWith(message);
        });
    });

    describe('warn', () => {
        it('should log warn text', () => {
            const message = 'My test Message';
            const spyOnConsole = spyOn(console, 'warn');

            service.warn(message);

            expect(spyOnConsole).toHaveBeenCalledWith(message);
        });
    });

    describe('error', () => {
        it('should log error text', () => {
            const message = 'My test Message';
            const spyOnConsole = spyOn(console, 'error');

            service.error(message);

            expect(spyOnConsole).toHaveBeenCalledWith(message);
        });

        it('should log error object', () => {
            const error = new Error('Test Error');
            const spyOnConsole = spyOn(console, 'error');

            service.error(error);

            expect(spyOnConsole).toHaveBeenCalledWith(error);
        });
    });
});
