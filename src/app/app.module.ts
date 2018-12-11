import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main';
import { PartyMngModule } from './party-mgt';
import { DetailsModule } from './details';
import { PageNotFoundModule } from './page-not-found';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MainModule,
        PartyMngModule,
        DetailsModule,
        PageNotFoundModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
