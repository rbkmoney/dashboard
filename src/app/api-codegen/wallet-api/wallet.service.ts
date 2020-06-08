import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WalletsService as BaseWalletsService } from './swagger-codegen/api/wallets.service';

@Injectable()
export class WalletService extends BaseWalletsService {
    defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}
