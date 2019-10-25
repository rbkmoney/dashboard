import { Component, Input, Inject } from '@angular/core';

import { FileMeta } from '../../../api-codegen/anapi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-files',
    templateUrl: 'files.component.html'
})
export class FilesComponent {
    @Input() files: FileMeta[];

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
