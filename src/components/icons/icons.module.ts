import { NgModule } from '@angular/core';
import { IconCrossComponent } from '@dsh/components/icons/icon-cross/icon-cross.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [IconCrossComponent],
    exports: [IconCrossComponent],
    imports: [MatIconModule, CommonModule],
})
export class IconsModule {}
