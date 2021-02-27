import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationService } from './navigation.service';

@NgModule({
    imports: [RouterModule],
    providers: [NavigationService],
})
export class NavigationModule {}
