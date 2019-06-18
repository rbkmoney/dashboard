import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

@NgModule({
    imports: [FlexLayoutModule, RouterModule],
    declarations: [MainComponent]
})
export class MainModule {}
