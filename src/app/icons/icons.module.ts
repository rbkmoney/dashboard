import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsService } from './icons.service';

@NgModule({
    imports: [CommonModule],
    providers: [IconsService],
})
export class IconsModule {}
