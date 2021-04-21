import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoTestingModule } from '@ngneat/transloco';
import cloneDeep from 'lodash-es/cloneDeep';
import { Observable, of } from 'rxjs';

import { ShopsService } from '@dsh/api-codegen/capi/shops.service';
import { Shop } from '@dsh/api-codegen/capi/swagger-codegen';
import { ApiShopsService } from '@dsh/api/shop';

import { generateMockShopItem } from '../../../../tests/generate-shop-item';
import { ShopActionsService } from '../../services/shop-actions/shop-actions.service';
import { ShopActionResult } from '../../types/shop-action-result';
import { ShopActionsComponent } from './shop-actions.component';

class MockShopsService {
    getShops(): Observable<Shop[]> {
        return of([]);
    }
}

@Injectable()
class MockApiShopsService extends ApiShopsService {
    set mockShops(shops: Shop[]) {
        this._shops = shops;
    }
    private _shops: Shop[] = [];

    set mockActionResponse(response: any) {
        this._actionResponse = response;
    }
    private _actionResponse: any;

    getShopByID(shopID: string): Observable<Shop> {
        return of(this._shops.find(({ id }) => id === shopID));
    }

    getShops(): Observable<Shop[]> {
        return of(this._shops);
    }

    reloadShops() {
        this._shops = cloneDeep(this._shops);
    }

    suspendShop() {
        return of(this._actionResponse);
    }

    activateShop() {
        return of(this._actionResponse);
    }
}

class MockMatDialogRef<T = any, R = any> extends MatDialogRef<T, R> {}

class MockMatDialog {
    private _dialogRef: MockMatDialogRef;

    get dialogRef(): MockMatDialogRef {
        return this._dialogRef;
    }

    open<T, R = any>(): MockMatDialogRef<T, R> {
        this._dialogRef = new MockMatDialogRef(null, null);
        return this._dialogRef;
    }
}

describe('ShopActionsComponent', () => {
    let component: ShopActionsComponent;
    let fixture: ComponentFixture<ShopActionsComponent>;
    let mockDialog: MockMatDialog;
    let actionsService: ShopActionsService;

    beforeEach(async () => {
        mockDialog = new MockMatDialog();

        await TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({
                    en: {
                        shops: {
                            panel: {
                                activate: 'activate',
                                suspend: 'suspend',
                            },
                            suspend: {
                                success: 'success suspend',
                                error: 'error suspend',
                            },
                            activate: {
                                success: 'success activate',
                                error: 'error activate',
                            },
                        },
                    },
                }),
                MatSnackBarModule,
            ],
            declarations: [ShopActionsComponent],
            providers: [
                ShopActionsService,
                {
                    provide: ApiShopsService,
                    useClass: MockApiShopsService,
                },
                {
                    provide: ShopsService,
                    useClass: MockShopsService,
                },
                {
                    provide: MatDialog,
                    useValue: mockDialog,
                },
            ],
        })
            .overrideComponent(ShopActionsComponent, { set: { providers: [] } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShopActionsComponent);
        component = fixture.componentInstance;
        actionsService = TestBed.inject(ShopActionsService);

        component.shop = generateMockShopItem(1);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('suspend', () => {
        it('should call service suspend method', () => {
            const spyOnSuspend = spyOn(actionsService, 'suspend').and.returnValue(of(ShopActionResult.Success));

            component.suspend('id');

            expect(spyOnSuspend).toHaveBeenCalledTimes(1);
            expect(spyOnSuspend).toHaveBeenCalledWith('id');
        });

        it('should emit update data if suspend was successful', () => {
            const spyOnSuspend = spyOn(actionsService, 'suspend').and.returnValue(of(ShopActionResult.Success));
            const spyOnUpdateData = spyOn(component.updateData, 'emit').and.callThrough();

            component.suspend('id');

            expect(spyOnSuspend).toHaveBeenCalledTimes(1);
            expect(spyOnUpdateData).toHaveBeenCalledTimes(1);
        });

        it('should emit update data if suspend was not successful', () => {
            const spyOnSuspend = spyOn(actionsService, 'suspend').and.returnValue(of(ShopActionResult.Error));
            const spyOnUpdateData = spyOn(component.updateData, 'emit').and.callThrough();

            component.suspend('id');

            expect(spyOnSuspend).toHaveBeenCalledTimes(1);
            expect(spyOnUpdateData).not.toHaveBeenCalledTimes(1);
        });
    });

    describe('activate', () => {
        it('should call service activate method', () => {
            const spyOnActivate = spyOn(actionsService, 'activate').and.returnValue(of(ShopActionResult.Success));

            component.activate('id');

            expect(spyOnActivate).toHaveBeenCalledTimes(1);
            expect(spyOnActivate).toHaveBeenCalledWith('id');
        });

        it('should emit update data if activate was successful', () => {
            const spyOnActivate = spyOn(actionsService, 'activate').and.returnValue(of(ShopActionResult.Success));
            const spyOnUpdateData = spyOn(component.updateData, 'emit').and.callThrough();

            component.activate('id');

            expect(spyOnActivate).toHaveBeenCalledTimes(1);
            expect(spyOnUpdateData).toHaveBeenCalledTimes(1);
        });

        it('should emit update data if activate was not successful', () => {
            const spyOnActivate = spyOn(actionsService, 'activate').and.returnValue(of(ShopActionResult.Error));
            const spyOnUpdateData = spyOn(component.updateData, 'emit').and.callThrough();

            component.activate('id');

            expect(spyOnActivate).toHaveBeenCalledTimes(1);
            expect(spyOnUpdateData).not.toHaveBeenCalledTimes(1);
        });
    });
});
