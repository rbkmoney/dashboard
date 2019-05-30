import { Injectable } from '@angular/core';

@Injectable()
export class FloatPanelService {
    isExpanded = false;
    isPinned = false;

    constructor() {}

    expand = () => {
        this.isExpanded = true;
    };

    close = () => {
        this.isExpanded = false;
    };

    expandToggle = () => {
        this.isExpanded ? this.close() : this.expand();
    };

    pin = () => {
        this.isPinned = true;
    };

    unpin = () => {
        this.isPinned = false;
    };

    pinToggle = () => {
        this.isPinned ? this.unpin() : this.pin();
    };
}
