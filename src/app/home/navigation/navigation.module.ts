import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';

import { MENU_LINKS, MENU_LINKS_TOKEN } from './consts';
import { NavigationService } from './navigation.service';

@NgModule({
    imports: [RouterModule],
    providers: [
        NavigationService,
        {
            provide: MENU_LINKS_TOKEN,
            useValue: cloneDeep(MENU_LINKS),
        },
    ],
})
export class NavigationModule {}
