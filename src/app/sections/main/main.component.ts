import { Component } from '@angular/core';

import { ConfigService } from '../../config';

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
    docsEndpoint = this.configService.ext.docsEndpoint;
    supportMailto = `mailto:${this.configService.ext.supportEmail}`;

    constructor(private configService: ConfigService) {}
}
