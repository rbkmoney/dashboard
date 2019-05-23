import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
    sidenav: string[] = [];

    get isShowSidenav(): boolean {
        return Array.isArray(this.sidenav) && !!this.sidenav.length;
    }

    constructor() {}
}
