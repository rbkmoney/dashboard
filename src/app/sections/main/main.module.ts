import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { LocaleModule } from '../../locale/locale.module';

@NgModule({
    imports: [FlexLayoutModule, RouterModule, LocaleModule],
    declarations: [MainComponent]
})
export class MainModule {}
