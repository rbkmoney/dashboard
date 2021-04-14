import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { BehaviorSubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Wallet, WebhookScope } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { IdentityService } from '@dsh/api/identity';
import { AutocompleteVirtualScrollComponent } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/autocomplete-virtual-scroll.component';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';
import { oneMustBeSelected } from '@dsh/components/form-controls';

import { WalletOptionsSelectionService } from '../../../../services/wallet-options-selection/wallet-options-selection.service';
import { getEventsByTopic } from '../get-events-by-topic';

import TopicEnum = WebhookScope.TopicEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-create-webhook-form',
    templateUrl: 'create-webhook-form.component.html',
    providers: [WalletOptionsSelectionService],
})
export class CreateWebhookFormComponent implements OnInit {
    @ViewChild('formElement', { static: false, read: ElementRef }) contentRef: ElementRef<HTMLElement>;

    @ViewChild('autocomplete', { static: false }) autocomplete: AutocompleteVirtualScrollComponent;

    @Input()
    form: FormGroup;

    identities$ = this.identityService.identities$;

    activeTopic$ = new BehaviorSubject<TopicEnum>('WithdrawalsTopic');

    options$ = this.walletOptionsService.options$;
    innerWalletControl = this.walletOptionsService.control;

    get contentWindow(): HTMLElement | undefined {
        return this.contentRef?.nativeElement?.parentElement;
    }

    private get walletControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('walletID'))) {
            throw new Error(`Can't find walletID control. FormGroup or FormControl doesn't exist`);
        }
        return this.form.get('walletID') as FormControl;
    }

    constructor(
        private identityService: IdentityService,
        private walletOptionsService: WalletOptionsSelectionService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.initWalletControl();
        this.activeTopic$.subscribe((activeTopic) => {
            if (activeTopic === 'WithdrawalsTopic') {
                this.form.addControl('walletID', this.fb.control(''));
            } else {
                this.form.removeControl('walletID');
            }
            this.form.removeControl('eventTypes');
            this.form.addControl(
                'eventTypes',
                this.fb.array(
                    getEventsByTopic(activeTopic).map((eventName) =>
                        this.fb.group({
                            eventName,
                            selected: false,
                        })
                    ),
                    [oneMustBeSelected]
                )
            );
        });
    }

    changeActiveTopic(topic: TopicEnum) {
        this.activeTopic$.next(topic);
    }

    get eventTypes() {
        return this.form.get('eventTypes') as FormArray;
    }

    private initWalletControl() {
        const formWalletID = this.walletControl.value as string | undefined;
        this.options$
            .pipe(
                map((wallets: BaseOption<string>[]) => {
                    return wallets.find(({ id }: BaseOption<string>) => id === formWalletID);
                }),
                take(1),
                filter(Boolean)
            )
            .subscribe((wallet: BaseOption<string>) => {
                this.innerWalletControl.setValue(wallet);
            });

        this.walletOptionsService.selectedWallet$
            .pipe(
                map((wallet: Wallet | null) => (isNil(wallet) ? '' : wallet.id)),
                untilDestroyed(this)
            )
            .subscribe((walletID: string) => {
                this.walletControl.setValue(walletID);
            });
    }
}
