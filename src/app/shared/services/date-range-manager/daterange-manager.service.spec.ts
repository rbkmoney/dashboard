import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import moment from 'moment';

import { DATE_RANGE_TYPE } from './consts';
import { DaterangeManagerService } from './daterange-manager.service';
import { DaterangeType } from './types/daterange-type';

describe('DaterangeManagerService', () => {
    let service: DaterangeManagerService;

    function createService(data?: TestModuleMetadata) {
        TestBed.configureTestingModule({
            providers: [DaterangeManagerService],
            ...data,
        });
        service = TestBed.inject(DaterangeManagerService);
    }

    describe('creation', () => {
        it('should be created', () => {
            createService();
            expect(service).toBeTruthy();
        });
    });

    describe('defaultDateRange', () => {
        it('should create new date using default range type', () => {
            createService();

            expect(service.defaultDateRange).toEqual({
                begin: moment().startOf('M'),
                end: moment().endOf('M'),
            });
        });

        it('should use provided range type', () => {
            createService({
                providers: [
                    DaterangeManagerService,
                    {
                        provide: DATE_RANGE_TYPE,
                        useValue: DaterangeType.Week,
                    },
                ],
            });

            expect(service.defaultDateRange).toEqual({
                begin: moment().startOf('week'),
                end: moment().endOf('week'),
            });
        });
    });

    describe('serializeDateRange', () => {
        it('should format date from date objects to strings', () => {
            createService();

            const daterange = {
                begin: moment(),
                end: moment(),
            };

            expect(service.serializeDateRange(daterange)).toEqual({
                begin: daterange.begin.format(),
                end: daterange.end.format(),
            });
        });
    });

    describe('deserializeDateRange', () => {
        it('should format date from date objects to strings', () => {
            createService();

            const daterange = {
                begin: moment().format(),
                end: moment().format(),
            };

            expect(service.deserializeDateRange(daterange)).toEqual({
                begin: moment(daterange.begin),
                end: moment(daterange.end),
            });
        });
    });
});
