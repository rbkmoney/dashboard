import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { WalletService } from '@dsh/api';

import { generateMockWalletsList } from '../../../../../../sections/wallet-section/tests/generate-mock-wallets-list';
import { WalletOptionsSelectionService } from './wallet-options-selection.service';

describe('WalletSelectorService', () => {
    let service: WalletOptionsSelectionService;
    let mockWalletService: WalletService;

    const MAIN_CONFIG = {
        providers: [
            WalletOptionsSelectionService,
            {
                provide: WalletService,
                useFactory: () => instance(mockWalletService),
            },
        ],
    };

    function configureTestingModule() {
        TestBed.configureTestingModule(MAIN_CONFIG);
        service = TestBed.inject(WalletOptionsSelectionService);
    }

    beforeEach(() => {
        mockWalletService = mock(WalletService);

        when(mockWalletService.wallets$).thenReturn(of([]));
    });

    describe('creation', () => {
        beforeEach(() => {
            configureTestingModule();
        });

        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('options$', () => {
        it('should map Wallet objects in BaseOption', () => {
            when(mockWalletService.wallets$).thenReturn(of(generateMockWalletsList(3)));

            configureTestingModule();

            const expected$ = cold('(a|)', {
                a: [
                    {
                        id: 'mock_wallet_1',
                        label: 'Mock wallet name',
                    },
                    {
                        id: 'mock_wallet_2',
                        label: 'Mock wallet name',
                    },
                    {
                        id: 'mock_wallet_3',
                        label: 'Mock wallet name',
                    },
                ],
            });

            expect(service.options$).toBeObservable(expected$);
        });
    });

    describe('selectedWallet$', () => {
        let expected$;

        afterEach(() => {
            expect(service.selectedWallet$).toBeObservable(expected$);
        });

        it('should update selected value with found wallet item', () => {
            const mockList = generateMockWalletsList(5);
            when(mockWalletService.wallets$).thenReturn(of(mockList));

            configureTestingModule();

            service.control.setValue({
                id: 'mock_wallet_2',
                label: 'Mock wallet name',
            });

            expected$ = cold('a', {
                a: mockList[1],
            });
        });

        it('should set selected value with nullable value if wallet id was not found in wallets list', () => {
            const mockList = generateMockWalletsList(5);
            when(mockWalletService.wallets$).thenReturn(of(mockList));

            configureTestingModule();

            service.control.setValue({
                id: 'mock_wallet_12',
                label: 'Mock wallet name',
            });

            expected$ = cold('a', {
                a: null,
            });
        });
    });
    //
});
